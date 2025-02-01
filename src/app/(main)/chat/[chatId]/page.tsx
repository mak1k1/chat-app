import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

interface ChatDetailPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatDetailPage({ params }: ChatDetailPageProps) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const chat = await prisma.chat.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      Group: true,
    },
  });

  if (!chat) {
    redirect("/");
  }

  const title = chat.Group?.[0]?.name || "Direct Message";

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader title={title} />
      <ChatMessages />
      <ChatInput />
    </div>
  );
} 