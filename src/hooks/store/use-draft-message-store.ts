import { useDraftMessagesStore } from "@/store/draft-messages-store"
import { useCallback, useEffect } from "react"

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

  const rehydrate = useCallback(() => {
    useDraftMessagesStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    rehydrate()
  }, [rehydrate])

  return {
    draftMessage,
    updateDraft,
    clearDraftMessage,
    rehydrate,
  }
}
