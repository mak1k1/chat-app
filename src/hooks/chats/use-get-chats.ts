import { useQuery } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { ChatWithUsers } from "@/types/api/chats"

const getChats = async (): Promise<ChatWithUsers[]> => {
  try {
    const response = await fetch(`/api/chats/`)

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

export const useGetChats = () => {
  return useQuery({
    queryKey: chatKeys.all(),
    queryFn: () => getChats(),
    staleTime: Infinity,
  })
}
