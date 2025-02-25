import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ContactList } from "@/components/features/contacts/contact-list"
import { AddContact } from "@/components/features/contacts/add-contact"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

async function getContacts() {
  const { userId } = await auth()
  if (!userId) return []

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      contacts: {
        include: {
          contact: true,
        },
      },
    },
  })

  return user?.contacts ?? []
}

export default async function ContactsPage() {
  const contacts = await getContacts()

  return (
    <div className="flex-1 space-y-4 p-4">
      <div>
        <h2 className="text-lg font-bold">Contacts</h2>
      </div>

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="add-contact">Add Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <ContactList initialContacts={contacts} />
        </TabsContent>
        <TabsContent value="add-contact">
          <AddContact />
        </TabsContent>
      </Tabs>
    </div>
  )
}
