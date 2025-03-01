import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { ChatWithUsers } from "@/types/api/chats"

const getChat = async (chatId: string): Promise<ChatWithUsers> => {
  try {
    const response = await fetch(`/api/chats/${chatId}`)

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

export const useGetChat = (chatId: string) => {
  return useQuery({
    queryKey: chatKeys.detail(chatId),
    queryFn: () => getChat(chatId),
    staleTime: Infinity,
  })
}
