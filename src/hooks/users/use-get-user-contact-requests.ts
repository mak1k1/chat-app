import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { ContactRequest, User } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

interface ContactRequestWithSender extends ContactRequest {
  sender: User
}

const getUserContactRequests = async () => {
  return fetchApi<ContactRequestWithSender[]>(
    `/api/users/received-contact-requests`,
    {},
    "Failed to fetch contact requests"
  )
}

interface UseGetUserContactRequestsOptions {
  initialData?: ContactRequestWithSender[]
}

export const useGetUserContactRequests = (options: UseGetUserContactRequestsOptions = {}) => {
  return useQuery({
    queryKey: userKeys.contactRequests(),
    queryFn: getUserContactRequests,
    initialData: options.initialData,
    retry: false,
  })
}
