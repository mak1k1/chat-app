import { PrismaClient } from '@prisma/client';
import { createClerkClient } from '@clerk/nextjs/server';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

const prisma = new PrismaClient();
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function syncClerkUsers() {
  try {
    // Get all users from Clerk
    const clerkUsersResponse = await clerk.users.getUserList();
    const clerkUsers = clerkUsersResponse.data;
    console.log(`Found ${clerkUsers.length} users in Clerk`);

    // Process each user
    for (const clerkUser of clerkUsers) {
      const {
        id,
        firstName,
        lastName,
        imageUrl,
        emailAddresses,
        phoneNumbers,
      } = clerkUser;

      const primaryEmail = emailAddresses[0];
      if (!primaryEmail) {
        console.log(`Skipping user ${id} - no email address`);
        continue;
      }

      const primaryPhone = phoneNumbers[0];

      // Create or update user in database
      await prisma.user.upsert({
        where: { id: id },
        update: {
          firstName: firstName || "",
          lastName: lastName || "",
          email: primaryEmail.emailAddress,
          phone: primaryPhone?.phoneNumber || null,
          imageUrl: imageUrl || null,
        },
        create: {
          id: id,
          firstName: firstName || "",
          lastName: lastName || "",
          email: primaryEmail.emailAddress,
          phone: primaryPhone?.phoneNumber || null,
          imageUrl: imageUrl || null,
        },
      });

      console.log(`Synced user: ${firstName} ${lastName} (${primaryEmail.emailAddress})`);
    }

    console.log('Clerk user sync completed successfully');
  } catch (error) {
    console.error('Error syncing Clerk users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Check if running directly (not imported)
if (require.main === module) {
  // Ensure CLERK_SECRET_KEY is set
  if (!process.env.CLERK_SECRET_KEY) {
    console.error('Error: CLERK_SECRET_KEY environment variable is required');
    process.exit(1);
  }

  syncClerkUsers()
    .catch((error) => {
      console.error('Failed to sync users:', error);
      process.exit(1);
    });
}

export { syncClerkUsers }; 