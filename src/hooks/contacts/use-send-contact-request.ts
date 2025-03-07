import { useMutation, useQueryClient } from "@tanstack/react-query"
import { contactKeys } from "./query-keys"
import { userKeys } from "../users/query-keys"
import { toast } from "sonner"
import { fetchApi } from "@/lib/fetch"
import { ContactRequest } from "@prisma/client"

interface SendContactRequestInput {
  userId: string
}

const sendContactRequest = async (data: SendContactRequestInput) => {
  return fetchApi<ContactRequest>(`/api/contact-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

export const useSendContactRequest = () => {
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
