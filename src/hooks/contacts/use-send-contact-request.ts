import { useMutation, useQueryClient } from "@tanstack/react-query"
import { contactKeys } from "./query-keys"
import { userKeys } from "../users/query-keys"
import { toast } from "sonner"

interface SendContactRequestInput {
  userId: string
}

async function sendContactRequest(data: SendContactRequestInput) {
  const response = await fetch("/api/contact-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to send request")
  }

  return response.json()
}

export function useSendContactRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendContactRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all })
      queryClient.invalidateQueries({ queryKey: userKeys.contactRequests() })
      toast.success("Contact request sent")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
