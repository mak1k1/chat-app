import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { Message } from "@prisma/client"
import { useChatStore } from "@/store/chat-store"

const getChatMessages = async (chatId: string): Promise<Message[]> => {
  try {
    const response = await fetch(`/api/chats/${chatId}/messages`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to handle request")
    }
  
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useChatMessages = (chatId: string) => {
  // Set this chat as active in UI state
  const setActiveChatId = useChatStore(state => state.setActiveChatId)
  
  // When this hook is called, set this chat as active
  if (chatId) {
    setActiveChatId(chatId)
  }

  // Fetch messages with React Query - this is our source of truth for server data
  return useQuery({
    queryKey: chatKeys.messages(chatId),
    queryFn: () => getChatMessages(chatId),
    staleTime: Infinity, // Don't refetch automatically since we'll update via socket
    enabled: !!chatId,
  })
} 