import { CreateChatButton } from "./create-chat-button";

export function ChatSidebar() {
  return (
    <aside className="w-80 border-r bg-muted/40">
      <CreateChatButton />
      <nav className="p-4">
        <p className="text-sm font-medium">Chats will go here</p>
      </nav>
    </aside>
  );
} 