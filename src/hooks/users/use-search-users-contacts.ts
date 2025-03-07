import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { SearchUsersContactsResponse } from "@/types/api/users"
import { fetchApi } from "@/lib/fetch"

export interface SearchUsersContactsOptions {
  searchQuery: string
  enabled?: boolean
}

const searchUsersContacts = async (searchQuery: string) => {
  return fetchApi<SearchUsersContactsResponse>(
    `/api/users/contacts/search?searchQuery=${encodeURIComponent(searchQuery)}`,
    {},
    "Failed to search contacts"
  )
}

export const useSearchUsersContacts = (options: SearchUsersContactsOptions) => {
  return useQuery({
    queryKey: userKeys.contactsSearch(options.searchQuery),
    queryFn: () => searchUsersContacts(options.searchQuery),
    enabled: options.enabled && !!options.searchQuery,
    retry: false,
  })
}
