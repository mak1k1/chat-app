import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatWithUsers } from "@/types/api/chats"
import { useAuth } from "@clerk/nextjs"
import { LastMessage } from "./last-message"

interface DirectMessageChatCardProps {
  chat: ChatWithUsers
}

export const DirectMessageChatCard: React.FC<DirectMessageChatCardProps> = ({ chat }) => {
  const { userId } = useAuth()
  const { users } = chat

  const otherUser = users.find(member => member.user.id !== userId)?.user || users[0].user
  const displayName = `${otherUser.firstName} ${otherUser.lastName}`
  const initials = `${otherUser.firstName[0]}${otherUser.lastName[0]}`

  return (
    <div className="border rounded-md flex items-center gap-3 p-2 h-16">
      <Avatar>
        <AvatarImage src={otherUser.imageUrl || undefined} alt={displayName} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{displayName}</p>
        <LastMessage chatId={chat.id} />
      </div>
    </div>
  )
}
