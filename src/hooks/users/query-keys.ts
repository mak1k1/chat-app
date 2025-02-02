export const userKeys = {
  all: () => ["users"] as const,
  search: (query: string) => ["users", "search", query] as const,
  detail: (id: string) => ["users", id] as const,
  contacts: () => ["users", "contacts"] as const,
  contactsSearch: (query: string) => ["users", "contacts", "search", query] as const,
} as const; 