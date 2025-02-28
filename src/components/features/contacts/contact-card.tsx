import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Contact, User } from "@prisma/client"

interface ContactWithUser extends Contact {
  contact: User
}

interface ContactCardProps {
  contact: ContactWithUser
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { contact: user } = contact
  const fullName = `${user.firstName} ${user.lastName}`
  const initials = `${user.firstName[0]}${user.lastName[0]}`

  return (
    <div className="border rounded-md flex items-center gap-3 p-3 h-16">
      <Avatar>
        <AvatarImage src={user.imageUrl || undefined} alt={fullName} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{fullName}</p>
        <p className="text-sm text-muted-foreground truncate">{user.phone}</p>
      </div>
    </div>
  )
}
