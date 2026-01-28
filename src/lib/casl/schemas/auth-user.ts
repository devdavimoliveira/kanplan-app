import z from 'zod'
import { roleSchema } from '@/types/Role'

export const authUserSchema = z.object({
	id: z.string(),
	role: roleSchema,
})

export type AuthUser = z.infer<typeof authUserSchema>
