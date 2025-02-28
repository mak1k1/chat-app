"use client"

interface ChatHeaderProps {
  chatId?: string
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chatId }) => {
  return (
    <div className="h-16 border-b flex items-center px-4">
      <h2 className="font-semibold">{chatId || "Select a chat to start messaging"}</h2>
    </div>
  )
}
