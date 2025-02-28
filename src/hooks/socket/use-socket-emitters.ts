import { useSocket } from '@/hooks/store/use-socket-store'
import { useUser } from '@clerk/nextjs'
import { SOCKET_EVENTS } from '@/constants/socket-events'
import { useCallback } from 'react'
import { useChatStore } from '@/store/chat-store'

export const useSendMessage = () => {
  const { socket } = useSocket()
  const { user } = useUser()

  return useCallback((chatId: string, content: string) => {
    if (!socket || !content.trim() || !user) {
      throw new Error("Cannot send message: missing socket, content, or user")
    }
    socket.emit(SOCKET_EVENTS.MESSAGE_SEND, { content, chatId })
  }, [socket, user])
}

export const useStartTyping = () => {
  const { socket } = useSocket()
  const { user } = useUser()
  const { setTyping } = useChatStore()

  return useCallback((chatId: string) => {
    if (!socket || !user) return
    socket.emit(SOCKET_EVENTS.TYPING_START, { chatId, userId: user.id })
    setTyping(chatId, user.id, true)
  }, [socket, user, setTyping])
}

export const useStopTyping = () => {
  const { socket } = useSocket()
  const { user } = useUser()
  const { setTyping } = useChatStore()

  return useCallback((chatId: string) => {
    if (!socket || !user) return
    socket.emit(SOCKET_EVENTS.TYPING_STOP, { chatId, userId: user.id })
    setTyping(chatId, user.id, false)
  }, [socket, user, setTyping])
} 