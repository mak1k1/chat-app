import { ChatSidebar } from "@/components/features/chat/chat-sidebar"
import { SocketProvider } from "@/components/providers/socket-provider"

interface ChatLayoutProps {
  children: React.ReactNode
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <SocketProvider>
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </SocketProvider>
  )
}
