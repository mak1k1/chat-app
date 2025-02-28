import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DraftMessagesState {
  drafts: Record<string, string>
  setDraft: (chatId: string, content: string) => void
  getDraft: (chatId: string) => string
  clearDraft: (chatId: string) => void
  clearAllDrafts: () => void
}

export const useDraftMessagesStore = create<DraftMessagesState>()(
  persist(
    (set, get) => ({
      drafts: {},
      
      setDraft: (chatId, content) => 
        set((state) => ({
          drafts: {
            ...state.drafts,
            [chatId]: content
          }
        })),
      
      getDraft: (chatId) => 
        get().drafts[chatId] || '',
      
      clearDraft: (chatId) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [chatId]: ''
          }
        })),

      clearAllDrafts: () => 
        set({ drafts: {} })
    }),
    {
      name: 'chat-drafts-by-chat-id',
      partialize: (state) => ({ drafts: state.drafts }),
    }
  )
) 