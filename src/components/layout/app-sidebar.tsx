"use client"

import { MessageSquare, Users, UserPlus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const AppSidebar: React.FC = () => {
  const pathname = usePathname()

  const items = [
    {
      icon: MessageSquare,
      href: "/",
      label: "Chats",
      active: pathname === "/",
    },
    {
      icon: Users,
      href: "/contacts",
      label: "Contacts",
      active: pathname === "/contacts",
    },
    {
      icon: UserPlus,
      href: "/contact-requests",
      label: "Contact Requests",
      active: pathname === "/contact-requests",
    },
  ]

  return (
    <aside className="w-16 border-r bg-muted/40 flex flex-col items-center py-4">
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-lg mb-2 hover:bg-accent/50 transition-colors",
            item.active && "bg-accent"
          )}
          title={item.label}
        >
          <item.icon className="w-5 h-5" />
        </Link>
      ))}
    </aside>
  )
}
