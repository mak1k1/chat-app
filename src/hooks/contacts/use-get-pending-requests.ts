import { useQuery } from "@tanstack/react-query"
import { contactKeys } from "./query-keys"
import { fetchApi } from "@/lib/fetch"

interface PendingRequest {
  recipientId: string
}

const getPendingRequests = async () => {
  return fetchApi<PendingRequest[]>(`/api/contact-requests/pending`, {}, "Failed to fetch pending requests")
}

export const useGetPendingRequests = () => {
  return useQuery({
    queryKey: contactKeys.pending(),
    queryFn: getPendingRequests,
  })
}
