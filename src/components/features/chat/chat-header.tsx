interface ChatHeaderProps {
  title?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <div className="h-16 border-b flex items-center px-4">
      <h2 className="font-semibold">
        {title || "Select a chat to start messaging"}
      </h2>
    </div>
  );
} 