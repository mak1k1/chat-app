import { Prisma } from "@prisma/client"

export const SearchUsersContactsConfig = {
  include: {
    contact: true
  },
  take: 10
} as const

export type SearchUsersContactsRequest = {
  searchQuery: string
}

export type SearchUsersContactsResponse = Prisma.ContactGetPayload<typeof SearchUsersContactsConfig>[] 

export type GetUserContactsResponse = Prisma.ContactGetPayload<typeof SearchUsersContactsConfig>[] 