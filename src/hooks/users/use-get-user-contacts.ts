import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { Contact, User } from "@prisma/client"
import { fetchApi } from "@/lib/fetch"

const getUserContacts = async () => {
  return fetchApi<ContactWithUser[]>(`/api/users/contacts/`, {}, "Failed to search contacts")
}

interface ContactWithUser extends Contact {
  contact: User
}

interface UseGetUserContactsOptions {
  initialData?: ContactWithUser[]
}

export const useGetUserContacts = (options: UseGetUserContactsOptions = {}) => {
  return useQuery({
    queryKey: userKeys.contacts(),
    queryFn: getUserContacts,
    initialData: options.initialData,
    retry: false,
  })
}
