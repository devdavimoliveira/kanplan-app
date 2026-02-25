import { api } from '@/lib/axios'

export interface MoveTaskBody {
	taskId: string
	targetColumnId: string
	aboveTaskId: string | null
	belowTaskId: string | null
}

export async function moveTask(body: MoveTaskBody) {
	const { data } = await api.patch(`/tasks/move`, body)

	return data
}
