import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { User } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

interface SearchUsersOptions {
  phoneNumber: string
  enabled?: boolean
}

const searchUsers = async (phoneNumber: string) => {
  return fetchApi<User[]>(`/api/users/search?phone=${encodeURIComponent(phoneNumber)}`, {}, "Failed to search users")
}

export const useSearchUsers = (options: SearchUsersOptions) => {
  return useQuery({
    queryKey: userKeys.search(options.phoneNumber),
    queryFn: () => searchUsers(options.phoneNumber),
    enabled: options.enabled && !!options.phoneNumber,
    retry: false,
  })
}
