export const contactKeys = {
  all: ['contacts'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  search: (query: string) => [...contactKeys.all, 'search', query] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
  pending: () => [...contactKeys.all, 'pending'] as const,
}
