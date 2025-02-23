export const ChatInput: React.FC = () => {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-md border bg-background"
          disabled
        />
        <button 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          disabled
        >
          Send
        </button>
      </div>
    </div>
  );
} 