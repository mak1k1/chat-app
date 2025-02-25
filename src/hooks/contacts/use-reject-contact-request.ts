import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactKeys } from "./query-keys";
import { userKeys } from "../users/query-keys";
import { toast } from "sonner";

interface RejectContactRequestInput {
  requestId: string;
}

async function rejectContactRequest({ requestId }: RejectContactRequestInput) {
  const response = await fetch(`/api/contact-requests/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "REJECTED" }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to handle request");
  }

  return response.json();
}

export function useRejectContactRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectContactRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
      toast.success("Contact request rejected");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
} 