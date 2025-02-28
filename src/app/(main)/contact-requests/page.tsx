import { ContactRequests } from "@/components/features/contact-requests/contact-requests"

export default async function ContactRequestsPage() {
  return (
    <div className="flex-1">
      <div className="border-b bg-background">
        <div className="px-6 h-16 flex items-center">
          <h2 className="text-lg font-semibold">Contact Requests</h2>
        </div>
      </div>

      <div className="px-6 py-4 md:max-w-xl">
        <ContactRequests />
      </div>
    </div>
  )
}
