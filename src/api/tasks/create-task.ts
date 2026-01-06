import { api } from '@/lib/axios'
import type { Task } from '@/types/Task'

export interface CreateTaskBody {
	description: string
	position: number
	columnId: string
	createdBy: string
}

export async function createTask(body: CreateTaskBody) {
	const { data } = await api.post<Task>('/tasks/create', body)

	return data
}
