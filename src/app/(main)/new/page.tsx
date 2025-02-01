import { ChatHeader } from "@/components/chat/chat-header";

export default function NewChatPage() {
  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader title="New Conversation" />
      <div className="flex-1 p-4">
        <p className="text-center text-muted-foreground">
          Select users to start a conversation
        </p>
      </div>
    </div>
  );
} 