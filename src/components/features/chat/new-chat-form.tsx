"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ContactSearch } from "@/components/features/contacts/contact-search"
import { useSearchUsersContacts } from "@/hooks/users/use-search-users-contacts"
import { Contact, Prisma } from "@prisma/client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { SearchUsersContactsConfig } from "@/types/api/users"
import { useCreateChat } from "@/hooks/chats/use-create-chat"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const NewChatForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const router = useRouter()
  const {
    data: contacts,
    isLoading,
    error,
  } = useSearchUsersContacts({
    searchQuery: searchQuery ?? "",
    enabled: !!searchQuery,
  })
  const { mutate: createChat, isPending } = useCreateChat()
  const { user: loggedUser } = useUser()

  const handleSearchContact = (query: string) => {
    setSearchQuery(query)
  }

  const handleCreateChat = async (user: Contact) => {

    createChat(
      {
        userIds: [user.contactId, loggedUser!.id],
      },
      {
        onSuccess: chat => {
          toast.success("Chat created successfully")
          router.push(`/chat/${chat.id}`)
        },
        onError: error => {
          toast.error("Failed to create chat " + error.message)
          console.error(error)
        },
      },
    )
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
              <Button
                onClick={() => handleCreateChat(contact)}
                disabled={isPending}
                className="ml-4"
              >
                {isPending ? "Starting..." : "Start Chat"}
              </Button>
            </div>
          </div>
        ))}
    </div>
  )
}
