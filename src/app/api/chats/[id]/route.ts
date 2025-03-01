import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const { userId: loggedUserId } = await auth()

    if (!loggedUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chat = await prisma.chat.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    })
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    const isMember = chat.users.some(user => user.userId === loggedUserId)

    if (!isMember) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(chat)
  } catch (error) {
    console.error("[GET_CHAT]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
