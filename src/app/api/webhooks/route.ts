import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload and data:", body, evt.data);
  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      email_addresses,
      primary_email_address_id,
      first_name,
      last_name,
      image_url,
      phone_numbers,
      primary_phone_number_id,
    } = evt.data;
    const emailObject = email_addresses?.find((email) => {
      return email.id === primary_email_address_id;
    });

    if (!emailObject) {
      return new Response("Error: No email object found", {
        status: 400,
      });
    }

    const phoneObject = phone_numbers?.find((phone) => {
      return phone.id === primary_phone_number_id;
    });
    await prisma.user.upsert({
      where: { id: id },
      update: {
        firstName: first_name || "",
        lastName: last_name || "",
        email: emailObject.email_address,
        phone: phoneObject?.phone_number || null,
        imageUrl: image_url || null,
      },
      create: {
        id: id,
        firstName: first_name || "",
        lastName: last_name || "",
        email: emailObject.email_address,
        phone: phoneObject?.phone_number || null,
        imageUrl: image_url || null,
      },
    });
  } else if (eventType === "user.deleted") {
    await prisma.user.delete({
      where: { id: id },
    });
  }
  console.log(`User ${id} was ${eventType}`);
  return new Response("Webhook received", { status: 200 });
}
