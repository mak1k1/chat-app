import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ContactRequests } from "@/components/features/contacts/contact-requests";

async function getContactRequests() {
  const { userId } = await auth();
  if (!userId) return [];

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      receivedContactRequests: {
        include: {
          sender: true
        }
      }
    }
  });

  return user?.receivedContactRequests ?? [];
}

export default async function ContactRequestsPage() {
  const contactRequests = await getContactRequests();

  return (
    <div className="flex-1 space-y-4 p-4">
      <div>
        <h2 className="text-lg font-bold">Contact Requests</h2>
      </div>

      <ContactRequests initialRequests={contactRequests} />
    </div>
  );
} 