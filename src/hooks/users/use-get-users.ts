import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { User } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

const getUsers = async () => {
  return fetchApi<User[]>(`/api/users`, {}, "Failed to fetch users")
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: userKeys.all(),
    queryFn: getUsers,
  })
}
