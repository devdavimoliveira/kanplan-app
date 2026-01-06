import z from 'zod'
import { memberSchema } from '../schemas/member'

export const memberSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('manage'),
	]),
	z.union([z.literal('Member'), memberSchema]),
])

export type MemberSubject = z.infer<typeof memberSubject>
