import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id: (await params).id,
      },
      include: {
        users: {
          select: {
            userId: true,
          },
        },
        messages: true,
      },
    })

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }
    
    const isMember = chat.users.some(user => user.userId === userId)

    if (!isMember) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(chat.messages)

  } catch (error) {
    console.error("[GET_CHAT_MESSAGES]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
