import { PrismaClient } from '@prisma/client'
import { syncClerkUsers } from './clerkSync'
import { createClerkClient } from '@clerk/nextjs/server'
import { config } from 'dotenv'
import { randomBytes } from 'crypto'
import * as fs from 'fs/promises'
import * as path from 'path'

// Load environment variables from .env
config()

const prisma = new PrismaClient()
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

function generateSecurePassword() {
  // Generate a secure random password with mixed case, numbers, and symbols
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  const length = 16
  let password = ''
  const bytes = randomBytes(length)
  for (let i = 0; i < length; i++) {
    password += chars[bytes[i] % chars.length]
  }
  return password
}

async function createClerkUser(email: string, firstName: string, lastName: string) {
  try {
    const existingUsers = await clerk.users.getUserList({
      emailAddress: [email],
    });
    
    if (existingUsers.data.length > 0) {
      console.log(`User ${email} already exists in Clerk`);
      return { id: existingUsers.data[0].id, isNew: false };
    }

    const password = generateSecurePassword();
    const user = await clerk.users.createUser({
      emailAddress: [email],
      firstName,
      lastName,
      password,
    });
    console.log(`Created Clerk user: ${firstName} ${lastName} (${email})`);
    return { id: user.id, password, isNew: true };
  } catch (error) {
    console.error(`Failed to create Clerk user ${email}:`, error);
    throw error;
  }
}

async function main() {
  // Clean the database
  await prisma.$transaction([
    prisma.readReceipt.deleteMany(),
    prisma.message.deleteMany(),
    prisma.groupMember.deleteMany(),
    prisma.group.deleteMany(),
    prisma.chatMember.deleteMany(),
    prisma.chat.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.user.deleteMany(),
  ])

  // Create test users in Clerk first
  if (process.env.CLERK_SECRET_KEY) {
    console.log('Creating test users in Clerk...');
    const testUsers = [
      { email: 'alice@example.com', firstName: 'alice', lastName: 'smith' },
      { email: 'bob@example.com', firstName: 'bob', lastName: 'smith' },
      { email: 'charlie@example.com', firstName: 'charlie', lastName: 'smith' },
    ];

    const createdUsers = [];
    for (const user of testUsers) {
      const result = await createClerkUser(user.email, user.firstName, user.lastName);
      if (result.isNew) {
        createdUsers.push({ ...user, password: result.password });
      }
    }

    // If any new users were created, save their credentials to a file
    if (createdUsers.length > 0) {
      const credentialsPath = path.join(__dirname, 'test-credentials.txt');
      const credentialsContent = createdUsers.map(user => 
        `${user.email}:${user.password}`
      ).join('\n');
      
      await fs.writeFile(credentialsPath, credentialsContent);
      console.log('\nNew test users created! Credentials saved to:', credentialsPath);
      console.log('Note: The credentials file is git-ignored for security.\n');
    }
    
    console.log('Test users setup completed');
  }

  // Now sync all users from Clerk to database
  if (process.env.CLERK_SECRET_KEY) {
    console.log('Syncing Clerk users...')
    await syncClerkUsers()
    console.log('Clerk users sync completed')
  } else {
    console.log('CLERK_SECRET_KEY not found, skipping Clerk sync')
  }

  // Get existing users after Clerk sync
  const existingUsers = await prisma.user.findMany({
    select: { id: true, email: true }
  })

  let alice = existingUsers.find(u => u.email === 'alice@example.com')
  let bob = existingUsers.find(u => u.email === 'bob@example.com')
  let charlie = existingUsers.find(u => u.email === 'charlie@example.com')

  // Create test users only if they don't exist
  if (!alice) {
    alice = await prisma.user.create({
      data: {
        firstName: 'alice',
        lastName: 'smith',
        email: 'alice@example.com',
        phone: '+1234567890',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
        bio: 'Hey there! I am Alice',
      },
    })
    console.log('Created test user Alice')
  }

  if (!bob) {
    bob = await prisma.user.create({
      data: {
        firstName: 'bob',
        lastName: 'smith',
        email: 'bob@example.com',
        phone: '+1234567891',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
        bio: 'Hey there! I am Bob',
      },
    })
    console.log('Created test user Bob')
  }

  if (!charlie) {
    charlie = await prisma.user.create({
      data: {
        firstName: 'charlie',
        lastName: 'smith',
        email: 'charlie@example.com',
        phone: '+1234567892',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
        bio: 'Hey there! I am Charlie',
      },
    })
    console.log('Created test user Charlie')
  }

  // Create contacts
  await prisma.contact.create({
    data: {
      ownerId: alice.id,
      contactId: bob.id,
    },
  })

  await prisma.contact.create({
    data: {
      ownerId: bob.id,
      contactId: alice.id,
    },
  })

  // Create a direct chat between Alice and Bob
  const directChat = await prisma.chat.create({
    data: {
      isGroup: false,
      users: {
        create: [
          { userId: alice.id },
          { userId: bob.id },
        ],
      },
    },
  })

  // Create some messages
  const message1 = await prisma.message.create({
    data: {
      content: 'Hey Bob!',
      senderId: alice.id,
      chatId: directChat.id,
    },
  })

  const message2 = await prisma.message.create({
    data: {
      content: 'Hi Alice!',
      senderId: bob.id,
      chatId: directChat.id,
    },
  })

  // Create read receipts
  await prisma.readReceipt.create({
    data: {
      messageId: message1.id,
      userId: bob.id,
    },
  })

  await prisma.readReceipt.create({
    data: {
      messageId: message2.id,
      userId: alice.id,
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 