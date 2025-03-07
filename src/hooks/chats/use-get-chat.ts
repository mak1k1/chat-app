import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { ChatWithUsers } from "@/types/api/chats"
import { fetchApi } from "@/lib/fetch"

const getChat = async (chatId: string): Promise<ChatWithUsers> => {
  return fetchApi<ChatWithUsers>(`/api/chats/${chatId}`, {}, "Failed to fetch chat details")
}

export const useGetChat = (chatId: string) => {
  return useQuery({
    queryKey: chatKeys.detail(chatId),
    queryFn: () => getChat(chatId),
    staleTime: Infinity,
    enabled: !!chatId,
  })
}
