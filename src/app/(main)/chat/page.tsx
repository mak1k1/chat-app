export default function ChatPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-muted/5">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-primary"
          >
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </svg>
        </div>
        <p className="text-2xl font-semibold">Welcome to Chat App</p>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Select an existing conversation from the sidebar or start a new one to
          begin messaging
        </p>
      </div>
    </div>
  );
}
