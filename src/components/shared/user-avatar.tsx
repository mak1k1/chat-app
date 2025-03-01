import { User } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  user: User | null | undefined
  className?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, className }) => {
  const firstName = user?.firstName || ""
  const lastName = user?.lastName || ""
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : "User"
  const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : "?"

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.imageUrl || undefined} alt={fullName} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
