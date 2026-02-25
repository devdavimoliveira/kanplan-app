export type Task = {
	id: string
	description: string
	position: number
	markingColor: string | null
	columnId: string
	createdAt: string | null
	createdBy: string
	assignedBy: string | null
}

export type TaskWithUserRelations = Task & {
	createdUser: { id: string; name: string; image: string | null }
	assignedUser: { id: string; name: string; image: string | null } | null
}
