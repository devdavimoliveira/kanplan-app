import { roleSchema } from '@/types/Role'
import z from 'zod'

export const authUserSchema = z.object({
	id: z.string(),
	role: roleSchema,
})

export type AuthUser = z.infer<typeof authUserSchema>
