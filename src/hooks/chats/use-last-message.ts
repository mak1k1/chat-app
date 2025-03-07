import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { Message, User } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

export interface LastMessageWithSender {
  message: Message | null
  sender: User | null
}

const getLastMessage = async (chatId: string): Promise<LastMessageWithSender> => {
  return fetchApi<LastMessageWithSender>(`/api/chats/${chatId}/last-message`, {}, "Failed to fetch last message")
}

export const useLastMessage = (chatId: string) => {
  return useQuery({
    queryKey: chatKeys.lastMessage(chatId),
    queryFn: () => getLastMessage(chatId),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!chatId,
  })
}
