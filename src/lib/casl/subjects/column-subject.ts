import z from 'zod'

export const columnSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('manage'),
	]),
	z.literal('Column'),
])

export type ColumnSubject = z.infer<typeof columnSubject>
