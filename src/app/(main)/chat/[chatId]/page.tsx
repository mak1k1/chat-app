import { ChatHeader } from "@/components/features/chat/chat-header";
import { ChatMessages } from "@/components/features/chat/chat-messages";
import { ChatInput } from "@/components/features/chat/chat-input";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

interface ChatDetailPageProps {
  chatId: string;
}

export default function ChatDetailPage({ params} :{ params: Promise<ChatDetailPageProps>}) {
  
  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader title={title} />
      <ChatMessages />
      <ChatInput />
    </div>
  );
} 