import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: { id: userId }, // Exclude current user
      },
      orderBy: {
        firstName: 'asc',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        imageUrl: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("[USERS_LIST]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
} 