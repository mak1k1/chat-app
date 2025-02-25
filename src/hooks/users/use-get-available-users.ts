import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { User } from "@prisma/client"

async function getAvailableUsers() {
  const res = await fetch("/api/users/available")
  if (!res.ok) throw new Error("Failed to fetch available users")
  return res.json() as Promise<User[]>
}

export function useGetAvailableUsers() {
  return useQuery({
    queryKey: userKeys.available(),
    queryFn: getAvailableUsers,
  })
}
