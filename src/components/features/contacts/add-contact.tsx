"use client";

import { Button } from "@/components/ui/button";
import { useSendContactRequest } from "@/hooks/contacts/use-send-contact-request";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetAvailableUsers } from "@/hooks/users/use-get-available-users";
import { useGetPendingRequests } from "@/hooks/contacts/use-get-pending-requests";

export function AddContact() {
  const { data: users, isLoading: isLoadingUsers } = useGetAvailableUsers();
  const { data: pendingRequests, isLoading: isLoadingRequests } = useGetPendingRequests();
  const { mutate: sendRequest, isPending } = useSendContactRequest();

  const isPendingRequest = (userId: string) => {
    return pendingRequests?.some(request => request.recipientId === userId);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Add Contact</h2>
      {(isLoadingUsers || isLoadingRequests) ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-24 bg-muted rounded" />
                </div>
              </div>
              <div className="w-16 h-8 bg-muted rounded" />
            </div>
          ))}
        </div>
      ) : !users?.length ? (
        <div className="text-center p-4 text-muted-foreground">
          No users available to add
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.imageUrl || undefined} />
                  <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button 
                onClick={() => sendRequest({ userId: user.id })} 
                disabled={isPending || isPendingRequest(user.id)}
                size="sm"
                variant={isPendingRequest(user.id) ? "secondary" : "default"}
              >
                {isPendingRequest(user.id) ? "Request Sent" : "Add"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
