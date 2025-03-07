import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatWithUsers } from "@/types/api/chats"
import { Users } from "lucide-react"
import { LastMessage } from "./last-message"

interface GroupChatCardProps {
  chat: ChatWithUsers
}

export const GroupChatCard: React.FC<GroupChatCardProps> = ({ chat }) => {
  const { users, group } = chat
  const displayName = group?.name || users.map(user => user.user.firstName).join(", ")

  return (
    <div className="border rounded-md flex items-center gap-3 p-2 h-16">
      <Avatar>
        <AvatarImage src={group?.imageUrl || undefined} alt={displayName} />
        <AvatarFallback className="bg-indigo-600">
          <Users className="h-4 w-4 text-white" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{displayName}</p>
        <LastMessage chatId={chat.id} />
      </div>
    </div>
  )
}
