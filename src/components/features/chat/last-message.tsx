import { Skeleton } from "@/components/ui/skeleton"
import { FileIcon } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { useLastMessage } from "@/hooks/chats/use-last-message"
import { formatMessageTime } from "@/lib/date-formatters"

interface LastMessageProps {
  chatId: string
}

export const LastMessage: React.FC<LastMessageProps> = ({ chatId }) => {
  const { userId } = useAuth()
  const { data: lastMessageData, isLoading } = useLastMessage(chatId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16 ml-2 flex-shrink-0" />
      </div>
    )
  }

  if (!lastMessageData?.message) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground truncate">No messages yet</span>
      </div>
    )
  }

  const { message, sender } = lastMessageData
  const isSender = sender?.id === userId
  const senderName = isSender ? "You" : `${sender?.firstName}`

  const messageContent =
    message.fileUrl && !message.content ? (
      <span className="text-sm text-muted-foreground truncate flex items-center gap-1">
        {senderName}: <FileIcon className="h-3 w-3" /> File
      </span>
    ) : (
      <span className="text-sm text-muted-foreground truncate">
        {senderName}: {message.content}
      </span>
    )

  return (
    <div className="flex items-center justify-between">
      {messageContent}
      <p className="text-sm text-muted-foreground truncate ml-2 flex-shrink-0">
        {formatMessageTime(new Date(message.createdAt))}
      </p>
    </div>
  )
}
