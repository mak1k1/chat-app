import { ChatHeader } from "@/components/features/chat/chat-header";
import { ChatMessages } from "@/components/features/chat/chat-messages";
import { ChatInput } from "@/components/features/chat/chat-input";

interface ChatDetailPageProps {
  chatId: string;
}

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<ChatDetailPageProps>;
}) {
  const { chatId } = await params;
  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader title={chatId} />
      <ChatMessages />
      <ChatInput />
    </div>
  );
} 