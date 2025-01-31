import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSwitchSessionUrl="/" />
      <ModeToggle />
      <h1 className="font-extrabold test-4xl text-center">Hello World (auth protected)</h1>
    </div>
  );
}
