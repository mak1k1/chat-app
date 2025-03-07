import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { ChatWithUsers } from "@/types/api/chats"
import { fetchApi } from "@/lib/fetch"

const getChats = async (): Promise<ChatWithUsers[]> => {
  return fetchApi<ChatWithUsers[]>(`/api/chats/`, {}, "Failed to fetch chats")
}

export const useGetChats = () => {
  return useQuery({
    queryKey: chatKeys.all(),
    queryFn: getChats,
    staleTime: Infinity,
  })
}
