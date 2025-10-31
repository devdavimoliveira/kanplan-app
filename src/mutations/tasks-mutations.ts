import { type MutationOptions, mutationOptions } from '@tanstack/react-query'
import { type CreateTaskBody, createTask } from '@/api/tasks/create-task'
import { type MoveTaskBody, moveTask } from '@/api/tasks/move-task'
import { type RemoveTaskParams, removeTask } from '@/api/tasks/remove-task'
import type { BoardWithColumnsAndTasks } from '@/types/Board'

export const moveTaskMutationOptions = (
	options?: Omit<
		MutationOptions<
			unknown,
			Error,
			MoveTaskBody,
			{ prevBoard?: BoardWithColumnsAndTasks }
		>,
		'mutationFn'
	>
) =>
	mutationOptions({
		mutationFn: (body: MoveTaskBody) => moveTask(body),
		...options,
	})

export const createTaskMutationOptions = (
	options?: Omit<
		MutationOptions<
			unknown,
			Error,
			CreateTaskBody,
			{ prevBoard?: BoardWithColumnsAndTasks }
		>,
		'mutationFn'
	>
) =>
	mutationOptions({
		mutationFn: (body: CreateTaskBody) => createTask(body),
		...options,
	})

export const removeTaskMutationOptions = (
	options?: Omit<
		MutationOptions<
			unknown,
			Error,
			RemoveTaskParams,
			{ prevBoard?: BoardWithColumnsAndTasks }
		>,
		'mutationFn'
	>
) =>
	mutationOptions({
		mutationFn: (params: RemoveTaskParams) => removeTask(params),
		...options,
	})
