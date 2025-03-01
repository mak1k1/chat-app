"use client"

import { useGetChats } from "@/hooks/chats/use-get-chats"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare } from "lucide-react"
import { ChatCard } from "./chat-card"

export const ChatList = () => {
  const { data: chats, isLoading } = useGetChats()
  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-16 w-full mb-2" />
        <Skeleton className="h-16 w-full mb-2" />
        <Skeleton className="h-16 w-full mb-2" />
      </div>
    )
  }

  if (!chats?.length) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <MessageSquare className="w-5 h-5" />
          <p>No chats available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      {chats.map(chat => (
        <ChatCard key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
