import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chatId = params.id

    const chatMember = await prisma.chatMember.findUnique({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
    })

    if (!chatMember) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    const lastMessage = await prisma.message.findFirst({
      where: {
        chatId,
        deleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sender: true,
      },
    })

    if (!lastMessage) {
      return NextResponse.json({ message: null, sender: null })
    }

    const { sender, ...messageData } = lastMessage

    return NextResponse.json({
      message: messageData,
      sender,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
