import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { GetUserContactsResponse } from "@/types/api/users"

export interface UsersContactsOptions {
  enabled?: boolean
}

async function getUserContacts(): Promise<GetUserContactsResponse> {
  const response = await fetch(`/api/users/contacts/`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to search contacts")
  }

  return data
}

export function useGetUserContacts({ enabled = true }: UsersContactsOptions) {
  return useQuery({
    queryKey: userKeys.contacts(),
    queryFn: () => getUserContacts(),
    enabled: enabled,
    retry: false, 
  })
}
