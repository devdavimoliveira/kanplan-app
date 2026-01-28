import z from 'zod'
import { roleSchema } from '@/types/Role'

export const memberSchema = z.object({
	__typename: z.literal('Member').default('Member'),
	role: roleSchema,
})

export type Member = z.infer<typeof memberSchema>
