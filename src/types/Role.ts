import { z } from 'zod'

export const roles = {
	owner: 'owner',
	admin: 'admin',
	member: 'member',
} as const

export const roleSchema = z.union([
	z.literal(roles.owner),
	z.literal(roles.admin),
	z.literal(roles.member),
])

export type Role = z.infer<typeof roleSchema>
