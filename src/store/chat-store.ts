import { create } from 'zustand'

interface ChatState {
  activeChatId: string | null
  unreadCounts: Record<string, number>
  typingUsers: Record<string, string[]>
  
  setActiveChatId: (chatId: string | null) => void
  incrementUnread: (chatId: string) => void
  resetUnread: (chatId: string) => void
  setTyping: (chatId: string, userId: string, isTyping: boolean) => void
}

export const useChatStore = create<ChatState>((set) => ({
  activeChatId: null,
  unreadCounts: {},
  typingUsers: {},
  
  setActiveChatId: (chatId) => set(state => {
    if (!chatId) return { activeChatId: null }
    
    const unreadCounts = { ...state.unreadCounts }
    unreadCounts[chatId] = 0
    
    return { activeChatId: chatId, unreadCounts }
  }),
  
  incrementUnread: (chatId) => set(state => {
    const unreadCounts = { ...state.unreadCounts }
    unreadCounts[chatId] = (unreadCounts[chatId] || 0) + 1
    return { unreadCounts }
  }),
  
  resetUnread: (chatId) => set(state => {
    const unreadCounts = { ...state.unreadCounts }
    unreadCounts[chatId] = 0
    return { unreadCounts }
  }),
  
  setTyping: (chatId, userId, isTyping) => set(state => {
    const typingUsers = { ...state.typingUsers }
    
    if (isTyping) {
      const currentUsers = typingUsers[chatId] || []
      if (!currentUsers.includes(userId)) {
        typingUsers[chatId] = [...currentUsers, userId]
      }
    } else {
      typingUsers[chatId] = (typingUsers[chatId] || []).filter(id => id !== userId)
    }
    
    return { typingUsers }
  })
})) 