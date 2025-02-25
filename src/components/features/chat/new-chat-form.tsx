"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ContactSearch } from "@/components/features/contacts/contact-search"
import { useSearchUsersContacts } from "@/hooks/users/use-search-users-contacts"
import { Contact, Prisma } from "@prisma/client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { SearchUsersContactsConfig } from "@/types/api/users"

export const NewChatForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const {
    data: contacts,
    isLoading,
    error,
  } = useSearchUsersContacts({
    searchQuery: searchQuery ?? "",
    enabled: !!searchQuery,
  })

  const handleSearchContact = (query: string) => {
    setSearchQuery(query)
  }

  const handleCreateChat = (user: Contact) => {
    console.log(user)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Search your contacts</h2>
      <ContactSearch onSearchContact={handleSearchContact} isLoading={isLoading} />

      {error && (
        <p className="text-sm text-destructive">{error instanceof Error ? error.message : "Something went wrong"}</p>
      )}

      {contacts &&
        contacts.length > 0 &&
        contacts.map((contact: Prisma.ContactGetPayload<typeof SearchUsersContactsConfig>) => (
          <div key={contact.id} className="mt-6 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={contact.contact.imageUrl || undefined}
                    alt={contact.contact.firstName + " " + contact.contact.lastName || ""}
                  />
                  <AvatarFallback>
                    {contact.contact.firstName?.[0]?.toUpperCase()}
                    {contact.contact.lastName?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-medium">{contact.contact.firstName + " " + contact.contact.lastName}</p>
                  <p className="text-sm text-muted-foreground">{contact.contact.phone}</p>
                </div>
              </div>
              <Button onClick={() => handleCreateChat(contact)} className="ml-4">
                Start Chat
              </Button>
            </div>
          </div>
        ))}
    </div>
  )
}
