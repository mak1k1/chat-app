import { useMutation, useQueryClient } from "@tanstack/react-query"
import { chatKeys } from "./query-keys"
import { Chat } from "@prisma/client"

export interface CreateChatData {
  userIds: string[]
  isGroup?: boolean
  name?: string
}

async function createChat(data: CreateChatData): Promise<Chat> {
  const response = await fetch("/api/chats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.error || "Failed to create chat")
  }

  return responseData
}

export function useCreateChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChat,
    onSuccess: newChat => {
      queryClient.invalidateQueries({ queryKey: chatKeys.all() })
      queryClient.setQueryData(chatKeys.detail(newChat.id), newChat)
    },
  })
}
