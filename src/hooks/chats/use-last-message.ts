import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { Message, User } from "@prisma/client"

export interface LastMessageWithSender {
  message: Message | null
  sender: User | null
}

const getLastMessage = async (chatId: string): Promise<LastMessageWithSender> => {
  try {
    const response = await fetch(`/api/chats/${chatId}/last-message`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to fetch last message")
    }

    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useLastMessage = (chatId: string) => {
  return useQuery({
    queryKey: chatKeys.lastMessage(chatId),
    queryFn: () => getLastMessage(chatId),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!chatId,
  })
}
