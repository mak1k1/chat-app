"use client"

import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useCallback } from "react"
import { useDraftMessage } from "@/hooks/store/use-draft-message-store"
import { useSendMessage, useStartTyping, useStopTyping } from "@/hooks/socket/use-socket-emitters"

interface ChatInputProps {
  chatId: string
}

export const ChatInput: React.FC<ChatInputProps> = ({ chatId }) => {
  const sendMessage = useSendMessage()
  const startTyping = useStartTyping()
  const stopTyping = useStopTyping()
  const { draftMessage = "", updateDraft, clearDraftMessage } = useDraftMessage(chatId)

  const handleTyping = (content: string) => {
    console.log(`Typing content: ${content}`)
    if (content) {
      console.log(`Start typing in chat: ${chatId}`)
      startTyping(chatId)
    } else {
      console.log(`Stop typing in chat: ${chatId}`)
      stopTyping(chatId)
    }
    updateDraft(content)
  }

  const handleSendMessage = useCallback(async () => {
    if (!draftMessage.trim()) return

    try {
      console.log(`Sending message in chat: ${chatId}`)
      sendMessage(chatId, draftMessage)
      clearDraftMessage()
      stopTyping(chatId)
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }, [chatId, draftMessage, sendMessage, clearDraftMessage, stopTyping])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleTyping(e.target.value)
  }

  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-2">
          <Textarea
            value={draftMessage}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          <Button onClick={handleSendMessage} disabled={!draftMessage.trim() ? true : undefined} size="icon">
            <Send className="h-4 w-4" />
          </Button>
      </div>
    </div>
  )
}
