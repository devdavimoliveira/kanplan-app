import { api } from '@/lib/axios'

export interface MoveTaskBody {
	taskId: string
	newColumnId: string
	beforeTaskId: string | null
	afterTaskId: string | null
}

export async function moveTask(body: MoveTaskBody) {
	const { data } = await api.put(`/tasks/move`, body)

	return data
}
