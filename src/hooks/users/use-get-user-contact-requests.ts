import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { ContactRequest, User } from "@prisma/client"

interface ContactRequestWithSender extends ContactRequest {
  sender: User;
}

export async function getUserContactRequests(): Promise<ContactRequestWithSender[]> {
  const response = await fetch(`/api/users/received-contact-requests`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to search contacts")
  }

  return data
}

interface UseGetUserContactRequestsOptions {
  initialData?: ContactRequestWithSender[];
}

export function useGetUserContactRequests(options: UseGetUserContactRequestsOptions = {}) {
  return useQuery({
    queryKey: userKeys.contactRequests(),
    queryFn: () => getUserContactRequests(),
    initialData: options.initialData,
    retry: false,
  })
}
