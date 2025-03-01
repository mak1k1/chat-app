import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { UserAvatar } from "@/components/shared/user-avatar"

interface AddContactCardProps {
  user: User
  isPending: boolean
  isPendingRequest: boolean
  onAdd: (userId: string) => void
}

export const AddContactCard: React.FC<AddContactCardProps> = ({ user, isPending, isPendingRequest, onAdd }) => {
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <UserAvatar user={user} />
        <div>
          <p className="font-medium">{fullName}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Button
        onClick={() => onAdd(user.id)}
        disabled={isPending || isPendingRequest}
        size="sm"
        variant={isPendingRequest ? "secondary" : "default"}
      >
        {isPendingRequest ? "Request Sent" : "Add"}
      </Button>
    </div>
  )
}
