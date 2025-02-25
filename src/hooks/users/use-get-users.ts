import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { User } from "@prisma/client"

async function getUsers() {
  const res = await fetch("/api/users")
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json() as Promise<User[]>
}

export function useGetUsers() {
  return useQuery({
    queryKey: userKeys.all(),
    queryFn: getUsers,
  })
}
