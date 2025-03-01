import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { ContactRequest, User } from "@prisma/client"
import { UserAvatar } from "@/components/shared/user-avatar"

interface ContactRequestWithSender extends ContactRequest {
  sender: User
}

interface ContactRequestCardProps {
  contactRequest: ContactRequestWithSender
  onAccept?: (id: string) => void
  onReject?: (id: string) => void
}

export const ContactRequestCard: React.FC<ContactRequestCardProps> = ({ contactRequest, onAccept, onReject }) => {
  const { sender } = contactRequest
  const fullName = `${sender.firstName} ${sender.lastName}`

  return (
    <div className="border rounded-md flex items-center gap-3 p-3 h-16">
      <UserAvatar user={sender} />

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{fullName}</p>
        <p className="text-sm text-muted-foreground truncate">{sender.email}</p>
      </div>

      <div className="flex gap-1">
        <Button size="sm" variant="reject" onClick={() => onReject?.(contactRequest.id)}>
          <X className="w-4 h-4" />
          <span className="sr-only">Reject</span>
        </Button>
        <Button size="sm" variant="accept" onClick={() => onAccept?.(contactRequest.id)}>
          <Check className="w-4 h-4" />
          <span className="sr-only">Accept</span>
        </Button>
      </div>
    </div>
  )
}
