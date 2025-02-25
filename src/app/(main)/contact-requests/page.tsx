import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { ContactRequests } from "@/components/features/contacts/contact-requests"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { userKeys } from "@/hooks/users/query-keys"

async function getContactRequests() {
  const { userId } = await auth()
  if (!userId) return []

  const pendingRequests = await prisma.contactRequest.findMany({
    where: {
      recipientId: userId,
      status: "PENDING",
    },
    include: {
      sender: true,
    },
  })

  return pendingRequests
}

export default async function ContactRequestsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: userKeys.contactRequests(),
    queryFn: getContactRequests,
  })

  return (
    <div className="flex-1">
      <div className="border-b bg-background">
        <div className="px-6 h-16 flex items-center">
          <h2 className="text-lg font-semibold">Contact Requests</h2>
        </div>
      </div>

      <div className="px-6 py-4 md:max-w-xl">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ContactRequests />
        </HydrationBoundary>
      </div>
    </div>
  )
}
