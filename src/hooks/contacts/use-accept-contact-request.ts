import { useMutation, useQueryClient } from "@tanstack/react-query"
import { contactKeys } from "./query-keys"
import { userKeys } from "../users/query-keys"
import { toast } from "sonner"
import { fetchApi } from "@/lib/fetch"
import { ContactRequest } from "@prisma/client"

interface AcceptContactRequestInput {
  requestId: string
}

const acceptContactRequest = async ({ requestId }: AcceptContactRequestInput) => {
  return fetchApi<ContactRequest>(`/api/contact-requests/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "ACCEPTED" }),
  })
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
