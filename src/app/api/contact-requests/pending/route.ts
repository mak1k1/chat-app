import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pendingRequests = await prisma.contactRequest.findMany({
      where: {
        senderId: userId,
        status: "PENDING",
      },
      select: {
        recipientId: true,
      },
    });

    return NextResponse.json(pendingRequests);
  } catch (error) {
    console.error("[PENDING_REQUESTS]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
} 