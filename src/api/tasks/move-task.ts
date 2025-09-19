import { api } from '@/lib/axios'

export interface MoveTaskBody {
	taskId: string
	newColumnId: string
	beforeTaskId: string | null
	afterTaskId: string | null
}

export async function moveTask(body: MoveTaskBody) {
	const { data } = await api.patch(`/tasks/move`, body)

	return data
}
