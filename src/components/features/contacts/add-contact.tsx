"use client"

import { useSendContactRequest } from "@/hooks/contacts/use-send-contact-request"
import { useGetAvailableUsers } from "@/hooks/users/use-get-available-users"
import { useGetPendingRequests } from "@/hooks/contacts/use-get-pending-requests"
import { Skeleton } from "@/components/ui/skeleton"
import { Users } from "lucide-react"
import { AddContactCard } from "./add-contact-card"

export const AddContact: React.FC = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetAvailableUsers()
  const { data: pendingRequests, isLoading: isLoadingRequests } = useGetPendingRequests()
  const { mutate: sendRequest, isPending } = useSendContactRequest()

  const isPendingRequest = (userId: string): boolean => {
    return pendingRequests?.some(request => request.recipientId === userId) ?? false
  }

  if (isLoadingUsers || isLoadingRequests) {
    return (
      <div className="p-4">
        <Skeleton className="h-16 w-full mb-2" />
        <Skeleton className="h-16 w-full mb-2" />
        <Skeleton className="h-16 w-full mb-2" />
      </div>
    )
  }

  if (!users?.length) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="w-5 h-5" />
          <p>No users available to add</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Add Contact</h2>
      <div className="grid gap-4">
        {users.map(user => (
          <AddContactCard
            key={user.id}
            user={user}
            isPending={isPending}
            isPendingRequest={isPendingRequest(user.id)}
            onAdd={userId => sendRequest({ userId })}
          />
        ))}
      </div>
    </div>
  )
}
