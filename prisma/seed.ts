import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

  // Create users
  const alice = await prisma.user.create({
    data: {
      firstName: 'alice',
      lastName: 'smith',
      email: 'alice@example.com',
      phone: '+1234567890',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      bio: 'Hey there! I am Alice',
    },
  })

  const bob = await prisma.user.create({
    data: {
      firstName: 'bob',
      lastName: 'smith',
      email: 'bob@example.com',
      phone: '+1234567891',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      bio: 'Hey there! I am Bob',
    },
  })

  const charlie = await prisma.user.create({
    data: {
      firstName: 'charlie',
      lastName: 'smith',
      email: 'charlie@example.com',
      phone: '+1234567892',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
      bio: 'Hey there! I am Charlie',
    },
  })

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

  // Create a group chat
  const groupChat = await prisma.chat.create({
    data: {
      isGroup: true,
      users: {
        create: [
          { userId: alice.id, isAdmin: true },
          { userId: bob.id },
          { userId: charlie.id },
        ],
      },
      Group: {
        create: {
          name: 'Friend Group',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=group',
          members: {
            create: [
              { userId: alice.id, isAdmin: true },
              { userId: bob.id },
              { userId: charlie.id },
            ],
          },
        },
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