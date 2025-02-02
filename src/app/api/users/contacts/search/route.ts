import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { SearchUsersContactsResponse } from "@/types/api/contacts"
import { SEARCHABLE_USER_FIELDS } from "@/constants/api"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('searchQuery')
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
                include: {
                    contact: true
                },
          where: {
            contact: {
              OR: SEARCHABLE_USER_FIELDS.map(field => ({
                [field]: {
                  contains: query,
                  mode: 'insensitive'
                }
              }))
            }
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
