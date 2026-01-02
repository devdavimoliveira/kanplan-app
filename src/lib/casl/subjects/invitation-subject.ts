import z from 'zod'

export const invitationSubject = z.tuple([
	z.union([z.literal('create'), z.literal('cancel'), z.literal('manage')]),
	z.literal('Invitation'),
])

export type InvitationSubject = z.infer<typeof invitationSubject>
