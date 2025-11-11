import type { ColumnWithTasks } from './Column'

export type Board = {
	id: string
	name: string
	highlightColor: string
	organizationId: string
	createdAt: string | null
}

export type BoardWithColumnsAndTasks = Board & {
	columns: ColumnWithTasks[]
}
