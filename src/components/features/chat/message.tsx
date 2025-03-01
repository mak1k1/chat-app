import { useUser } from "@clerk/nextjs"
import { Message as MessageType, User } from "@prisma/client"
import { cn } from "@/lib/utils"
import { formatMessageTime } from "@/lib/date-formatters"
import { UserAvatar } from "@/components/shared/user-avatar"

interface MessageProps {
  message: MessageType
  sender?: User
}

export const Message: React.FC<MessageProps> = ({ message, sender }) => {
  const { user } = useUser()
  const isSender = user?.id === sender?.id
  const formattedTime = formatMessageTime(new Date(message.createdAt))

  return (
    <div className="mb-2">
      <div className={cn("flex", isSender ? "justify-end" : "justify-start")}>
        <div className={cn("flex items-end gap-1.5", isSender ? "flex-row-reverse" : "flex-row")}>
          {!isSender && <UserAvatar user={sender} className="h-6 w-6 flex-shrink-0" />}

          <div
            className={cn(
              "px-3 py-2 shadow-sm max-w-sm",
              isSender
                ? "bg-emerald-500 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl"
                : "bg-white dark:bg-slate-800 rounded-tr-xl rounded-tl-xl rounded-br-xl"
            )}
          >
            {!isSender && sender && (
              <p className="text-xs font-medium text-emerald-500 dark:text-emerald-400 mb-1 truncate">
                {sender.firstName} {sender.lastName}
              </p>
            )}
            <div className="text-sm break-words">{message.content}</div>
            <div className={cn("text-[10px] text-right mt-1", isSender ? "text-emerald-100" : "text-muted-foreground")}>
              {formattedTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
