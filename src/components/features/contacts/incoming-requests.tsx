"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetIncomingRequests } from "@/hooks/contacts/use-get-incoming-requests";
import { useHandleContactRequest } from "@/hooks/contacts/use-handle-contact-request";

export function IncomingRequests() {
  const { data: requests, isLoading } = useGetIncomingRequests();
  const { mutate: handleRequest, isPending } = useHandleContactRequest();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Incoming Requests</h2>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-24 bg-muted rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-muted rounded" />
                <div className="w-20 h-8 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : !requests?.length ? (
        <div className="text-center p-4 text-muted-foreground">
          No pending requests
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={request.sender.imageUrl || undefined} />
                  <AvatarFallback>
                    {request.sender.firstName[0]}
                    {request.sender.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {request.sender.firstName} {request.sender.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {request.sender.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    handleRequest({ requestId: request.id, status: "ACCEPTED" })
                  }
                  disabled={isPending}
                  size="sm"
                >
                  Accept
                </Button>
                <Button
                  onClick={() =>
                    handleRequest({ requestId: request.id, status: "REJECTED" })
                  }
                  disabled={isPending}
                  variant="outline"
                  size="sm"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 