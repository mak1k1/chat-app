import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { Message } from "@prisma/client"

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
  return useQuery({
    queryKey: chatKeys.messages(chatId),
    queryFn: () => getChatMessages(chatId),
    staleTime: Infinity,
    enabled: !!chatId,
  })
}
