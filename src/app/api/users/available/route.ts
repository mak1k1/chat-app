import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all users except:
    // 1. Current user
    // 2. Users who are already contacts
    const availableUsers = await prisma.user.findMany({
      where: {
        AND: [
          { NOT: { id: userId } },
          {
            NOT: {
              OR: [
                { contacts: { some: { contactId: userId } } },
                { contactOf: { some: { ownerId: userId } } },
              ],
            },
          },
        ],
      },
      orderBy: {
        firstName: 'asc',
      },
    });

    return NextResponse.json(availableUsers);
  } catch (error) {
    console.error("[AVAILABLE_USERS]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
} 