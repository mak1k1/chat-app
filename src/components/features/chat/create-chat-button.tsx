"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

export const CreateChatButton: React.FC = () => {
  const router = useRouter();

  return (
    <div className="px-2">
      <Button
        onClick={() => router.push("/chat/new")}
        className="w-full mt-4"
      >
        <MessageSquarePlus className="h-4 w-4 mr-2" />
        New Chat
      </Button>
    </div>
  );
} 