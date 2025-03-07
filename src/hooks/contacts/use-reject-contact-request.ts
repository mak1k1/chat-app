import { useMutation, useQueryClient } from "@tanstack/react-query"
import { contactKeys } from "./query-keys"
import { userKeys } from "../users/query-keys"
import { toast } from "sonner"
import { fetchApi } from "@/lib/fetch"
import { ContactRequest } from "@prisma/client"

interface RejectContactRequestInput {
  requestId: string
}

const rejectContactRequest = async ({ requestId }: RejectContactRequestInput) => {
  return fetchApi<ContactRequest>(`/api/contact-requests/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "REJECTED" }),
  })
}

export const useRejectContactRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: rejectContactRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all })
      queryClient.invalidateQueries({ queryKey: userKeys.all() })
      toast.success("Contact request rejected")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
