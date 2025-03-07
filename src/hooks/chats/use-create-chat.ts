import { useMutation, useQueryClient } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { Chat } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

export interface CreateChatData {
  userIds: string[]
  isGroup?: boolean
  name?: string
}

const createChat = async (data: CreateChatData): Promise<Chat> => {
  return fetchApi<Chat>(
    "/api/chats",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    "Failed to create chat"
  )
}

export const useCreateChat = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChat,
    onSuccess: newChat => {
      queryClient.invalidateQueries({ queryKey: chatKeys.all() })
      queryClient.setQueryData(chatKeys.detail(newChat.id), newChat)
    },
  })
}
