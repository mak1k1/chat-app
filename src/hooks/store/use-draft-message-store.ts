import { useDraftMessagesStore } from "@/store/draft-messages-store"
import { useCallback } from "react"

export const useDraftMessage = (chatId: string) => {
  const { setDraft, getDraft, clearDraft } = useDraftMessagesStore()

  const draftMessage = getDraft(chatId)

  const updateDraft = useCallback(
    (content: string) => {
      setDraft(chatId, content)
    },
    [chatId, setDraft]
  )

  const clearDraftMessage = useCallback(() => {
    clearDraft(chatId)
  }, [chatId, clearDraft])

  return {
    draftMessage,
    updateDraft,
    clearDraftMessage,
  }
}
