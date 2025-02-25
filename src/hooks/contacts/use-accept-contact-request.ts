import { useMutation, useQueryClient } from "@tanstack/react-query"
import { contactKeys } from "./query-keys"
import { userKeys } from "../users/query-keys"
import { toast } from "sonner"

interface AcceptContactRequestInput {
  requestId: string
}

const acceptContactRequest = async ({ requestId }: AcceptContactRequestInput) => {
  const response = await fetch(`/api/contact-requests/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "ACCEPTED" }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to handle request")
  }

  return response.json()
}

export const useAcceptContactRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: acceptContactRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all })
      queryClient.invalidateQueries({ queryKey: userKeys.all() })
      toast.success("Contact request accepted")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
