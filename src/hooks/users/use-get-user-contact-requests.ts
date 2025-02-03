import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { GetUserContactRequestsResponse } from "@/types/api/users"

export interface UsersContactRequestsOptions {
  enabled?: boolean
}

async function getUserContactRequests(): Promise<GetUserContactRequestsResponse> {
  const response = await fetch(`/api/users/received-contact-requests`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to search contacts")
  }

  return data
}

export function useGetUserContactRequests({ enabled = true }: UsersContactRequestsOptions) {
  return useQuery({
    queryKey: userKeys.contactRequests(),
    queryFn: () => getUserContactRequests(),
    enabled: enabled,
    retry: false
  })
}
