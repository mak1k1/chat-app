import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { User, Prisma } from "@prisma/client"

const SEARCHABLE_USER_FIELDS = ['firstName', 'lastName', 'email', 'phone'] as const satisfies readonly (keyof User)[];

export const SearchUsersContactsConfig = {
  include: {
    user: true
  },
  take: 10
} as const

export type SearchUsersContactsResponse = Prisma.ContactGetPayload<typeof SearchUsersContactsConfig>[]


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    if (!query) {
      return NextResponse.json([], { status: 200 })
    }

    const contacts = await prisma.contact.findMany({
      where: {
        OR: SEARCHABLE_USER_FIELDS.map(field => ({
          [field]: {
            contains: query,
            mode: 'insensitive'
          }
        }))
      },
      include: SearchUsersContactsConfig.include,
      take: SearchUsersContactsConfig.take
    })

    return NextResponse.json<SearchUsersContactsResponse>(contacts, { status: 200 })

  } catch (error) {
    console.error('[CONTACTS_SEARCH]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
