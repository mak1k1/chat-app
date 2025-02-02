export const contactKeys = {
  all: ['contacts'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...contactKeys.lists(), { ...filters }] as const,
  search: (query: string) => [...contactKeys.all, 'search', query] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
}
