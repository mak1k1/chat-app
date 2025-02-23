import { CreateChatButton } from "./create-chat-button";

export const ChatSidebar: React.FC = () => {
  return (
    <aside className="w-80 border-r bg-muted/10 flex flex-col">
      <div className="p-4 border-b">
        <h1 className="font-semibold text-lg mb-4">Messages</h1>
        <CreateChatButton />
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <p className="text-sm text-muted-foreground p-2">No chats available</p>
      </nav>
    </aside>
  );
};
