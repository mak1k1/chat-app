import { useSocket } from "@/hooks/store/use-socket-store"
import { useQueryClient } from "@tanstack/react-query"
import { useChatStore } from "@/store/chat-store"
import { useEffect } from "react"
import { Message } from "@prisma/client"
import { chatKeys } from "../chats/query-keys"
import { SOCKET_EVENTS } from "@/constants/socket-events"

export const useSocketMessageHandler = () => {
  const { socket, isConnected } = useSocket()
  const queryClient = useQueryClient()
  const { activeChatId, incrementUnread, setTyping } = useChatStore()

  useEffect(() => {
    if (!socket || !isConnected) return

    // Handle new messages
    const handleNewMessage = (message: Message) => {
      // Update React Query cache directly
      queryClient.setQueryData(chatKeys.messages(message.chatId), (oldData: Message[] | undefined) => {
        // If we don't have this data cached yet, don't do anything
        if (!oldData) return oldData

        // Check for duplicates
        if (oldData.some(m => m.id === message.id)) return oldData

        // Add new message to cache
        return [...oldData, message]
      })

      // If this isn't the active chat, increment unread count
      if (message.chatId !== activeChatId) {
        incrementUnread(message.chatId)
      }

      // Invalidate chat list to update last message
      queryClient.invalidateQueries({ queryKey: chatKeys.all() })
    }

    // Handle typing indicators
    const handleTypingStart = ({ chatId, userId }: { chatId: string; userId: string }) => {
      setTyping(chatId, userId, true)
    }

    const handleTypingStop = ({ chatId, userId }: { chatId: string; userId: string }) => {
      setTyping(chatId, userId, false)
    }

    socket.on(SOCKET_EVENTS.MESSAGE_NEW, handleNewMessage)
    socket.on(SOCKET_EVENTS.TYPING_START, handleTypingStart)
    socket.on(SOCKET_EVENTS.TYPING_STOP, handleTypingStop)

    return () => {
      socket.off(SOCKET_EVENTS.MESSAGE_NEW, handleNewMessage)
      socket.off(SOCKET_EVENTS.TYPING_START, handleTypingStart)
      socket.off(SOCKET_EVENTS.TYPING_STOP, handleTypingStop)
    }
  }, [socket, isConnected, queryClient, activeChatId, incrementUnread, setTyping])
}
