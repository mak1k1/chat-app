import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { Contact, User } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

const getUserContacts = async () => {
  return fetchApi<Contact[]>(`/api/users/contacts/`, {}, "Failed to search contacts")
}

interface UseGetUserContactsOptions {
  initialData?: (Contact & { contact: User })[]
}

export const useGetUserContacts = (options: UseGetUserContactsOptions = {}) => {
  return useQuery({
    queryKey: userKeys.contacts(),
    queryFn: getUserContacts,
    initialData: options.initialData,
    retry: false,
  })
}
