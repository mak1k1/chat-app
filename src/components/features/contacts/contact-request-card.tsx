import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X } from "lucide-react"
import { ContactRequest, User } from "@prisma/client"

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
  const initials = `${sender.firstName[0]}${sender.lastName[0]}`

  return (
    <div className="border-b">
      <div className="flex items-center gap-3 p-3">
        <Avatar>
          <AvatarImage src={sender.imageUrl || undefined} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

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
    </div>
  )
}
