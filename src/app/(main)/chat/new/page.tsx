"use client";

import { ChatHeader } from "@/components/features/chat/chat-header";
import { ContactSearch } from "@/components/features/contacts/contact-search";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchUsersContacts } from "@/hooks/users/use-search-users-contacts";
import { Contact } from "@prisma/client";
import Image from "next/image";

export default function NewChatPage() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const {
    data: contacts,
    isLoading,
    error,
  } = useSearchUsersContacts({
    searchQuery: searchQuery ?? "",
    enabled: !!searchQuery,
  });

  const handleSearchContact = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateChat = (user: Contact) => {
    console.log(user);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader title="New Chat" />
      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Search your contacts</h2>
          <ContactSearch
            onSearchContact={handleSearchContact}
            isLoading={isLoading}
          />

          {error && (
            <p className="text-sm text-destructive">
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
          )}

          {contacts &&
            contacts.length > 0 &&
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="mt-6 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {contact.user.imageUrl ? (
                      <Image
                        src={contact.user.imageUrl}
                        alt={contact.user.firstName + " " + contact.user.lastName || ""}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-lg font-medium text-muted-foreground">
                          {contact.user.firstName?.[0]?.toUpperCase() + contact.user.lastName?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="font-medium">{contact.user.firstName + " " + contact.user.lastName}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.user.phone}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCreateChat(contact)}
                    className="ml-4"
                  >
                    Start Chat
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
