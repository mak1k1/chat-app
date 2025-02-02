import { User } from "@prisma/client"

export const SEARCHABLE_USER_FIELDS = ['firstName', 'lastName', 'email', 'phone'] as const satisfies readonly (keyof User)[] 