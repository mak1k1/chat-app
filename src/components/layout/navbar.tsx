import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">Chat App</h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton signInUrl="/sign-in" />
      </div>
    </header>
  );
} 