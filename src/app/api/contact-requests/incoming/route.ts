import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const incomingRequests = await prisma.contactRequest.findMany({
      where: {
        recipientId: userId,
        status: "PENDING",
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    })

    return NextResponse.json(incomingRequests)
  } catch (error) {
    console.error("[INCOMING_REQUESTS]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
