import { useChatStore } from "@/store/chat-store"

// Hook to get typing users for a specific chat
export const useTypingUsers = (chatId: string) => {
  return useChatStore(state => state.typingUsers[chatId] || [])
}

// Hook to get unread count for a specific chat
export const useUnreadCount = (chatId: string) => {
  return useChatStore(state => state.unreadCounts[chatId] || 0)
}

// Hook to get active chat ID
export const useActiveChatId = () => {
  return useChatStore(state => state.activeChatId)
}

// Hook to check if a chat is active
export const useIsChatActive = (chatId: string) => {
  return useChatStore(state => state.activeChatId === chatId)
}
