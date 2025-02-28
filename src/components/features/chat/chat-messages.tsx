"use client"

import { useChatMessages } from "@/hooks/chats/use-messages"
import { Skeleton } from "@/components/ui/skeleton"
interface ChatMessagesProps {
  chatId: string
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ chatId }) => {
  const { data: messages, isLoading } = useChatMessages(chatId)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">{messages?.map(message => <p key={message.id}>{message.content}</p>)}</div>
  )
}
