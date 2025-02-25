import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { GetUserContactRequestsResponse } from "@/types/api/users"

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
        receivedContactRequests: {
          include: {
            sender: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json<GetUserContactRequestsResponse>(user.receivedContactRequests, { status: 200 })
  } catch (error) {
    console.error("[CONTACTS_SEARCH]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
