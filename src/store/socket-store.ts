import { io, Socket } from "socket.io-client"
import { create } from "zustand"
import { SOCKET_EVENTS } from "@/constants/socket-events"

interface SocketStore {
  socket: Socket | null
  isConnected: boolean
  connect: (token: string) => void
  disconnect: () => void
}

export const useSocketStore = create<SocketStore>(set => ({
  socket: null,
  isConnected: false,
  connect: (token: string) => {
    const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL
    if (!WEBSOCKET_URL) {
      throw new Error("WEBSOCKET_URL is not defined")
    }

    const socket = io(WEBSOCKET_URL, {
      auth: {
        token,
      },
    })

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      set({ isConnected: true })
    })

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      set({ isConnected: false })
    })

    set({ socket })
  },
  disconnect: () => {
    set(state => {
      state.socket?.disconnect()
      return { socket: null, isConnected: false }
    })
  },
}))
