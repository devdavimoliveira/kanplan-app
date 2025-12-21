import z from 'zod'

export const boardSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('manage'),
	]),
	z.literal('Board'),
])

export type BoardSubject = z.infer<typeof boardSubject>
