import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();
    if (!status || !["ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Verify the request exists and user is the recipient
    const contactRequest = await prisma.contactRequest.findFirst({
      where: {
        id: params.id,
        recipientId: userId,
        status: "PENDING",
      },
    });

    if (!contactRequest) {
      return NextResponse.json(
        { error: "Contact request not found" },
        { status: 404 }
      );
    }

    // Update the request status
    const updatedRequest = await prisma.contactRequest.update({
      where: { id: params.id },
      data: { status },
    });

    // If accepted, create contacts for both users
    if (status === "ACCEPTED") {
      await prisma.contact.createMany({
        data: [
          {
            ownerId: contactRequest.senderId,
            contactId: contactRequest.recipientId,
          },
          {
            ownerId: contactRequest.recipientId,
            contactId: contactRequest.senderId,
          },
        ],
      });
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("[CONTACT_REQUEST_UPDATE]", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
} 