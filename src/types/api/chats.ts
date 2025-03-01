import { Prisma } from "@prisma/client"

export type ChatWithUsers = Prisma.ChatGetPayload<{
  include: {
    users: {
      include: {
        user: true
      }
    }
    group: {
      select: {
        id: true
        name: true
        imageUrl: true
      }
    }
  }
}>
