import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId: recipientId } = await request.json();
    if (!recipientId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Check if trying to add self
    if (recipientId === userId) {
      return NextResponse.json({ error: "Cannot add yourself" }, { status: 400 });
    }

    // Check if user exists
    const recipientUser = await prisma.user.findUnique({
      where: { id: recipientId }
    });

    if (!recipientUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already contacts
    const existingContact = await prisma.contact.findFirst({
      where: {
        OR: [
          { ownerId: userId, contactId: recipientId },
          { ownerId: recipientId, contactId: userId },
        ],
      },
    });

    if (existingContact) {
      return NextResponse.json({ error: "Already contacts" }, { status: 400 });
    }

    // Check for pending request
    const existingRequest = await prisma.contactRequest.findFirst({
      where: {
        OR: [
          { senderId: userId, recipientId: recipientId, status: "PENDING" },
          { senderId: recipientId, recipientId: userId, status: "PENDING" },
        ],
      },
    });

    if (existingRequest) {
      return NextResponse.json({ error: "Request already sent" }, { status: 400 });
    }

    // Create contact request
    const contactRequest = await prisma.contactRequest.create({
      data: {
        senderId: userId,
        recipientId: recipientId,
      },
      include: {
        sender: true,
        recipient: true,
      },
    });

    return NextResponse.json(contactRequest, { status: 201 });
  } catch (error) {
    console.error("[CONTACT_REQUEST]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
} 