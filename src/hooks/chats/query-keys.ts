export const chatKeys = {
  all: () => ["chats"] as const,
  detail: (id: string) => ["chats", id] as const,
  messages: (chatId: string) => ["chats", chatId, "messages"] as const,
  lastMessage: (chatId: string) => ["chats", chatId, "lastMessage"] as const,
} as const
