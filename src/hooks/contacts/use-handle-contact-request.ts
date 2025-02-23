import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactKeys } from "./query-keys";
import { userKeys } from "../users/query-keys";
import { toast } from "sonner";

interface HandleContactRequestInput {
  requestId: string;
  status: "ACCEPTED" | "REJECTED";
}

async function handleContactRequest({ requestId, status }: HandleContactRequestInput) {
  const response = await fetch(`/api/contact-requests/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to handle request");
  }

  return response.json();
}

export function useHandleContactRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleContactRequest,
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
      toast.success(
        status === "ACCEPTED"
          ? "Contact request accepted"
          : "Contact request rejected"
      );
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
} 