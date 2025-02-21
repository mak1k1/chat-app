import { useQuery } from "@tanstack/react-query";
import { contactKeys } from "./query-keys";

interface PendingRequest {
  recipientId: string;
}

async function getPendingRequests() {
  const res = await fetch("/api/contact-requests/pending");
  if (!res.ok) throw new Error("Failed to fetch pending requests");
  return res.json() as Promise<PendingRequest[]>;
}

export function useGetPendingRequests() {
  return useQuery({
    queryKey: contactKeys.pending(),
    queryFn: getPendingRequests
  });
} 