"use client"

import { useChatMessages } from "@/hooks/chats/use-messages"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetChat } from "@/hooks/chats/use-get-chat"
import { Message } from "./message"

interface ChatMessagesProps {
  chatId: string
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ chatId }) => {
  const { data: messages, isLoading } = useChatMessages(chatId)
  const { data: chat } = useGetChat(chatId)

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-hidden">
        <Skeleton className="h-12 w-72 self-start" />
        <Skeleton className="h-12 w-64 self-end" />
        <Skeleton className="h-12 w-72 self-start" />
      </div>
    )
  }

  if (!messages?.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <p className="text-muted-foreground text-sm">No messages yet</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 min-h-0">
      <div className="flex flex-col">
        <div className="mt-auto" />
        {messages?.map(message => (
          <Message
            key={message.id}
            message={message}
            sender={chat?.users.find(user => user.userId === message.senderId)?.user}
          />
        ))}
      </div>
    </div>
  )
}
