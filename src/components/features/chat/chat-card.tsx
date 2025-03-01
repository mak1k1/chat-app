import { ChatWithUsers } from "@/types/api/chats"
import { DirectMessageChatCard } from "./direct-message-chat-card"
import { GroupChatCard } from "./group-chat-card"
import { useRouter, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface ChatCardProps {
  chat: ChatWithUsers
}

export const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
  const { isGroup } = chat
  const router = useRouter()
  const params = useParams()

  const isActive = params.chatId === chat.id

  const handleSelectChat = () => {
    if (isActive) return

    router.push(`/chat/${chat.id}`)
  }

  return (
    <div
      onClick={handleSelectChat}
      className={cn(isActive ? "bg-accent/50 cursor-default" : "cursor-pointer")}
      aria-label={chat.isGroup ? "Group Chat" : "Direct Message"}
      tabIndex={0}
      role="button"
    >
      {isGroup ? <GroupChatCard chat={chat} /> : <DirectMessageChatCard chat={chat} />}
    </div>
  )
}
