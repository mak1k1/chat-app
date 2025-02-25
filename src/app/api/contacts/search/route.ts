import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { SEARCHABLE_USER_FIELDS } from "@/constants/api"
import { SearchContactsResponse } from "@/types/api/contacts"
import { SearchContactsConfig } from "@/types/api/contacts"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return NextResponse.json([], { status: 200 })
    }

    const contacts = await prisma.contact.findMany({
      where: {
        OR: SEARCHABLE_USER_FIELDS.map(field => ({
          [field]: {
            contains: query,
            mode: "insensitive",
          },
        })),
      },
      include: SearchContactsConfig.include,
      take: SearchContactsConfig.take,
    })

    return NextResponse.json<SearchContactsResponse>(contacts, { status: 200 })
  } catch (error) {
    console.error("[CONTACTS_SEARCH]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
