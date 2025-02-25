import { Prisma } from "@prisma/client"

export const SearchContactsConfig = {
  include: {
    contact: true,
  },
  take: 10,
} as const

export type SearchContactsRequest = {
  searchQuery: string
}

export type SearchContactsResponse = Prisma.ContactGetPayload<typeof SearchContactsConfig>[]
