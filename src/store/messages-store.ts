import { create } from "zustand"
import { Message } from "@prisma/client"

interface MessagesState {
  activeChatId: string | null
  messages: Message[]
  unreadCounts: Record<string, number>
  typingUsers: Record<string, string[]>

  setActiveChatId: (chatId: string | null) => void
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  incrementUnreadCount: (chatId: string) => void
  setTyping: (chatId: string, userId: string, isTyping: boolean) => void
  resetUnreadCount: (chatId: string) => void
}

export const useMessagesStore = create<MessagesState>(set => ({
  activeChatId: null,
  messages: [],
  unreadCounts: {},
  typingUsers: {},

  addMessage: message =>
    set(state => {
      if (state.activeChatId === message.chatId) {
        return {
          messages: [...state.messages, message],
        }
      }

      return {
        messages: [...state.messages, message],
        unreadCounts: {
          ...state.unreadCounts,
          [message.chatId]: (state.unreadCounts[message.chatId] || 0) + 1,
        },
      }
    }),

  setMessages: messages => set({ messages }),

  setActiveChatId: chatId =>
    set(state => ({
      activeChatId: chatId,
      unreadCounts: chatId
        ? {
            ...state.unreadCounts,
            [chatId]: 0,
          }
        : state.unreadCounts,
    })),

  incrementUnreadCount: chatId =>
    set(state => ({
      unreadCounts: {
        ...state.unreadCounts,
        [chatId]: (state.unreadCounts[chatId] || 0) + 1,
      },
    })),

  resetUnreadCount: chatId =>
    set(state => ({
      unreadCounts: {
        ...state.unreadCounts,
        [chatId]: 0,
      },
    })),

  setTyping: (chatId, userId, isTyping) =>
    set(state => {
      const currentTyping = state.typingUsers[chatId] || []

      return {
        typingUsers: {
          ...state.typingUsers,
          [chatId]: isTyping
            ? [...currentTyping, userId].filter((id, index, self) => self.indexOf(id) === index)
            : currentTyping.filter(id => id !== userId),
        },
      }
    }),
}))
