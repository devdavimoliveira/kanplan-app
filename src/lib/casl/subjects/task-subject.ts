import z from 'zod'

export const taskSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('support'),
		z.literal('manage'),
	]),
	z.literal('Task'),
])

export type TaskSubject = z.infer<typeof taskSubject>
