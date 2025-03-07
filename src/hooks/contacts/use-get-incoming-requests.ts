import { useQuery } from "@tanstack/react-query"
import { contactKeys } from "./query-keys"
import { User } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

interface IncomingRequest {
  id: string
  senderId: string
  recipientId: string
  status: string
  createdAt: string
  sender: Pick<User, "id" | "firstName" | "lastName" | "email" | "imageUrl">
}

const getIncomingRequests = async () => {
  return fetchApi<IncomingRequest[]>(`/api/contact-requests/incoming`, {}, "Failed to fetch incoming requests")
}

export const useGetIncomingRequests = () => {
  return useQuery({
    queryKey: contactKeys.incoming(),
    queryFn: getIncomingRequests,
  })
}
