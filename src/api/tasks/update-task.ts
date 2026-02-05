import { api } from '@/lib/axios'
import type { Task } from '@/types/Task'
import type { CreateTaskBody } from './create-task'

export interface UpdateTaskParams {
	taskId: string
}

export interface UpdateTaskBody
	extends Omit<Partial<CreateTaskBody>, 'createdBy'> {
	markingColor?: string | null
	assignedBy?: string | null
}

export async function updateTask(
	params: UpdateTaskParams,
	body: UpdateTaskBody
) {
	const { data } = await api.patch<Task>(`/tasks/${params.taskId}`, body)

	return data
}
