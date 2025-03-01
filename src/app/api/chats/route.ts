import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { CreateChatData } from "@/hooks/chats/use-create-chat"

export async function GET() {
  try {
    const { userId: loggedUserId } = await auth()
    if (!loggedUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: loggedUserId,
      },
      include: {
        chats: {
          select: {
            chat: {
              include: {
                users: {
                  include: {
                    user: true,
                  },
                },
                group: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const chats = user.chats.map(({ chat }) => chat)
    return NextResponse.json(chats)
  } catch (error) {
    console.error("[CHAT_GET]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId: loggedUserId } = await auth()
    if (!loggedUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userIds, isGroup, name } = (await request.json()) as CreateChatData

    if (!userIds || !userIds.length) {
      return NextResponse.json({ error: "User IDs required" }, { status: 400 })
    }

    if (!userIds.includes(loggedUserId)) {
      return NextResponse.json({ error: "User IDs must include the current user" }, { status: 400 })
    }

    // Verify all users exist
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    })

    if (users.length !== userIds.length) {
      return NextResponse.json({ error: "One or more users not found" }, { status: 404 })
    }

    // For direct messages, check if a chat already exists
    if (!isGroup && userIds.length === 2) {
      const [user1Id, user2Id] = [...userIds].sort()

      const existingChats = await prisma.$queryRaw<{ id: string }[]>`
        SELECT c.id 
        FROM "Chat" c
        JOIN "ChatMember" cm1 ON cm1."chatId" = c.id AND cm1."userId" = ${user1Id}
        JOIN "ChatMember" cm2 ON cm2."chatId" = c.id AND cm2."userId" = ${user2Id}
        WHERE c."isGroup" = false
        AND (SELECT COUNT(*) FROM "ChatMember" WHERE "chatId" = c.id) = 2
        LIMIT 1
      `

      if (existingChats.length > 0) {
        return NextResponse.json({ id: existingChats[0].id })
      }
    }

    // Create a new chat
    const chat = await prisma.chat.create({
      data: {
        isGroup: isGroup || false,
        users: {
          create: userIds.map(id => ({
            userId: id,
            isAdmin: id === loggedUserId,
          })),
        },
        ...(isGroup && name
          ? {
              group: {
                create: {
                  name,
                  imageUrl: null,
                },
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    })

    return NextResponse.json(chat)
  } catch (error) {
    console.error("[CHAT_CREATE]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
