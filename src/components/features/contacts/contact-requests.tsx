"use client"

import { useGetUserContactRequests } from "@/hooks/users/use-get-user-contact-requests"
import { ContactRequestCard } from "./contact-request-card"
import { Bell } from "lucide-react"
import { useAcceptContactRequest } from "@/hooks/contacts/use-accept-contact-request"
import { useRejectContactRequest } from "@/hooks/contacts/use-reject-contact-request"

export const ContactRequests = () => {
  const { data: contactRequests, isLoading } = useGetUserContactRequests()
  const { mutate: acceptContactRequest } = useAcceptContactRequest()
  const { mutate: rejectContactRequest } = useRejectContactRequest()

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary" />
      </div>
    )
  }

  if (!contactRequests?.length) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Bell className="w-5 h-5" />
          <p>No pending contact requests</p>
        </div>
      </div>
    )
  }

  return (
    <div className="divide-y divide-border rounded-md border mb-2">
      {contactRequests.map((contactRequest) => (
        <ContactRequestCard
          key={contactRequest.id}
          contactRequest={contactRequest}
          onAccept={() =>
            acceptContactRequest({ requestId: contactRequest.id })
          }
          onReject={() =>
            rejectContactRequest({ requestId: contactRequest.id })
          }
        />
      ))}
    </div>
  )
}
