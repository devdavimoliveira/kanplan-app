import { api } from '@/lib/axios'
import type { Task } from '@/types/Task'

export interface UpdateTaskParams {
	taskId: string
}

export interface UpdateTaskBody
	extends Omit<Partial<Task>, 'id' | 'createdAt'> {}

export async function updateTask(
	params: UpdateTaskParams,
	body: UpdateTaskBody
) {
	const { data } = await api.patch<Task>(`/tasks/${params.taskId}`, body)

	return data
}
