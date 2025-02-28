import { ChatHeader } from "@/components/features/chat/chat-header"
import { NewChatForm } from "@/components/features/chat/new-chat-form"

export default function NewChatPage() {
  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />
      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <NewChatForm />
      </div>
    </div>
  )
}
