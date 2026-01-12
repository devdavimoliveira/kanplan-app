import { api } from '@/lib/axios'
import type { Task } from '@/types/Task'

export interface AssignTaskParams {
	taskId: string
	assignedBy: string | null
}

export async function assignTask({ taskId, assignedBy }: AssignTaskParams) {
	const { data } = await api.patch<Task>(`/tasks/${taskId}/assign`, {
		assignedBy,
	})

	return data
}
