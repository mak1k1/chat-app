import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContactList } from "@/components/features/contacts/contact-list";
import { ContactRequests } from "@/components/features/contacts/contact-requests";
import { AddContact } from "@/components/features/contacts/add-contact";

export default function ContactsPage() {
  return (
    <div className="flex-1 space-y-4 p-4">
      <div>
        <h2 className="text-lg font-bold">Contacts</h2>
      </div>

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="contact-requests">Contact Requests</TabsTrigger>
          <TabsTrigger value="add-contact">Add Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <ContactList />
        </TabsContent>
        <TabsContent value="contact-requests">
          <ContactRequests />
        </TabsContent>
        <TabsContent value="add-contact">
          <AddContact />
        </TabsContent>
      </Tabs>
    </div>
  );
}
