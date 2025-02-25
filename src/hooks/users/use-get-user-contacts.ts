import { useQuery } from "@tanstack/react-query"
import { userKeys } from "./query-keys"
import { Contact, User } from "@prisma/client"

export async function getUserContacts(): Promise<(Contact & { contact: User })[]> {
  const response = await fetch(`/api/users/contacts/`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to search contacts")
  }

  return data
}

interface UseGetUserContactsOptions {
  initialData?: (Contact & { contact: User })[]
}

export function useGetUserContacts(options: UseGetUserContactsOptions = {}) {
  return useQuery({
    queryKey: userKeys.contacts(),
    queryFn: getUserContacts,
    initialData: options.initialData,
    retry: false,
  })
}
