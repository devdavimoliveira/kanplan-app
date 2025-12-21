import { z } from 'zod'

export const roleSchema = z.union([
	z.literal('owner'),
	z.literal('admin'),
	z.literal('member'),
])

export type Role = z.infer<typeof roleSchema>
