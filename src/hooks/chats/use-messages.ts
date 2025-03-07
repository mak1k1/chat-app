import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { Message } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

const getChatMessages = async (chatId: string): Promise<Message[]> => {
  return fetchApi<Message[]>(`/api/chats/${chatId}/messages`, {}, "Failed to fetch messages")
}

export const useChatMessages = (chatId: string) => {
  return useQuery({
    queryKey: chatKeys.messages(chatId),
    queryFn: () => getChatMessages(chatId),
    staleTime: Infinity,
    enabled: !!chatId,
  })
}
