import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

interface ChatDetailPageProps {
  chatId: string;
}

export default async function ChatDetailPage({ params} :{ params: Promise<ChatDetailPageProps>}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const chat = await prisma.chat.findUnique({
    where: {
      id: (await params).chatId,
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