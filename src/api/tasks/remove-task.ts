import { api } from '@/lib/axios'

export interface RemoveTaskParams {
	taskId: string
}

export async function removeTask(params: RemoveTaskParams) {
	await api.delete(`/tasks/${params.taskId}`)
}
