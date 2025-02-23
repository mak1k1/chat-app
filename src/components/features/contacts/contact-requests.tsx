"use client";

import { useGetUserContactRequests } from "@/hooks/users/use-get-user-contact-requests";
import { ContactRequest, User } from "@prisma/client";

interface ContactRequestWithSender extends ContactRequest {
  sender: User;
}

interface ContactRequestsProps {
  initialRequests: ContactRequestWithSender[];
}

export const ContactRequests: React.FC<ContactRequestsProps> = ({ initialRequests }) => {
  const { data: contactRequests, isLoading } = useGetUserContactRequests({
    initialData: initialRequests,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!contactRequests?.length) return <div>No contact requests found</div>;

  return (
    <div className="space-y-4">
      {contactRequests.map((contactRequest) => (
        <div key={contactRequest.id} className="p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium">
                {contactRequest.sender.firstName} {contactRequest.sender.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {contactRequest.sender.phone}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
