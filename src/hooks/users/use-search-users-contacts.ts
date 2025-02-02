import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { SearchUsersContactsResponse } from "@/app/api/contacts/search/route"

export interface SearchUsersContactsOptions {
  searchQuery: string
  enabled?: boolean
}

async function searchUsersContacts(searchQuery: string): Promise<SearchUsersContactsResponse> {
  const response = await fetch(`/api/users/contacts/search?searchQuery=${encodeURIComponent(searchQuery)}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to search contacts")
  }

  return data
}

export function useSearchUsersContacts({ searchQuery, enabled = true }: SearchUsersContactsOptions) {
  return useQuery({
    queryKey: userKeys.contactsSearch(searchQuery),
    queryFn: () => searchUsersContacts(searchQuery),
    enabled: enabled && !!searchQuery,
    retry: false,
  })
}
