"use client"

import { useGetUserContacts } from "@/hooks/users/use-get-user-contacts"
import { ContactCard } from "./contact-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users } from "lucide-react"

export const ContactList: React.FC = () => {
  const { data: contacts, isLoading } = useGetUserContacts({})

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-16 w-full mb-2" />
        <Skeleton className="h-16 w-full mb-2" />
        <Skeleton className="h-16 w-full mb-2" />
      </div>
    )
  }

  if (!contacts?.length) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="w-5 h-5" />
          <p>No contacts found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-2">
      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  )
}
