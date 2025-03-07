import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { User } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

const getAvailableUsers = async () => {
  return fetchApi<User[]>(`/api/users/available`, {}, "Failed to fetch available users")
}

export const useGetAvailableUsers = () => {
  return useQuery({
    queryKey: userKeys.available(),
    queryFn: getAvailableUsers,
  })
}
