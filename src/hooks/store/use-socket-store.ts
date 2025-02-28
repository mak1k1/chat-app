import { useSocketStore } from "@/store/socket-store"

export const useSocket = () => {
  const socket = useSocketStore(state => state.socket)
  const isConnected = useSocketStore(state => state.isConnected)
  const connect = useSocketStore(state => state.connect)
  const disconnect = useSocketStore(state => state.disconnect)

  return {
    socket,
    isConnected,
    connect,
    disconnect,
  }
}
