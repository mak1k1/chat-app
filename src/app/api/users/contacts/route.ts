import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { SearchUsersContactsResponse } from "@/types/api/users"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        contacts: {
          include: {
            contact: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json<SearchUsersContactsResponse>(user.contacts, {
      status: 200,
    })
  } catch (error) {
    console.error("[CONTACTS_SEARCH]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
