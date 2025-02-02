import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { User } from "@prisma/client"

interface SearchUsersOptions {
  phoneNumber: string
  enabled?: boolean
}

async function searchUsers(phoneNumber: string): Promise<User[]> {
  const response = await fetch(`/api/users/search?phone=${encodeURIComponent(phoneNumber)}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to search users")
  }

  return data
}

export function useSearchUsers({ phoneNumber, enabled = true }: SearchUsersOptions) {
  return useQuery({
    queryKey: userKeys.search(phoneNumber),
    queryFn: () => searchUsers(phoneNumber),
    enabled: enabled && !!phoneNumber,
    retry: false,
  })
} 