import { useQuery } from "@tanstack/react-query";
import { contactKeys } from "./query-keys";
import { User } from "@prisma/client";

interface IncomingRequest {
  id: string;
  senderId: string;
  recipientId: string;
  status: string;
  createdAt: string;
  sender: Pick<User, "id" | "firstName" | "lastName" | "email" | "imageUrl">;
}

async function getIncomingRequests() {
  const res = await fetch("/api/contact-requests/incoming");
  if (!res.ok) throw new Error("Failed to fetch incoming requests");
  return res.json() as Promise<IncomingRequest[]>;
}

export function useGetIncomingRequests() {
  return useQuery({
    queryKey: contactKeys.incoming(),
    queryFn: getIncomingRequests,
  });
} 