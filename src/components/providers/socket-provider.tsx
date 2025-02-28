"use client"

import { useSocketStore } from "@/store/socket-store"
import { useAuth } from "@clerk/nextjs"
import { PropsWithChildren, useEffect } from "react"
import { useSocketMessageHandler } from "@/hooks/socket/use-socket-message-handler"

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { getToken } = useAuth()
  const { connect, disconnect } = useSocketStore()

  useSocketMessageHandler()

  useEffect(() => {
    const initializeSocket = (() => {
      let initialized = false
      return () => {
        if (!initialized) {
          initialized = true

          getToken().then(token => {
            if (token) connect(token)
          })

          window.addEventListener("beforeunload", () => {
            disconnect()
          })
        }
      }
    })()

    initializeSocket()
  }, [getToken, connect, disconnect])

  return <>{children}</>
}
