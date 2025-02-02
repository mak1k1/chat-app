import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { User, Prisma } from "@prisma/client"
import { auth } from "@clerk/nextjs/server"

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
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            contacts: {
                where: {
                  OR: SEARCHABLE_USER_FIELDS.map(field => ({
                    [field]: {
                      contains: query,
                      mode: 'insensitive'
                    }
                  }))
                },
                include: {
                    user: true
                }
            }
        }
    })

    if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        )
    }

    return NextResponse.json<SearchUsersContactsResponse>(user.contacts, { status: 200 })

  } catch (error) {
    console.error('[CONTACTS_SEARCH]', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
