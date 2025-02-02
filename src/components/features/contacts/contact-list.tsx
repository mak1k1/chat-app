"use client";

import { useGetUserContacts } from "@/hooks/users/use-get-user-contacts";

export function ContactList() {
  const { data: contacts, isLoading } = useGetUserContacts({ enabled: true });

  if (isLoading) return <div>Loading...</div>;

  if (!contacts?.length) return <div>No contacts found</div>;

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div key={contact.id} className="p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium">
                {contact.contact.firstName} {contact.contact.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {contact.contact.phone}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
