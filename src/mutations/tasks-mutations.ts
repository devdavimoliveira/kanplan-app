import { type MutationOptions, mutationOptions } from '@tanstack/react-query'
import { type AssignTaskParams, assignTask } from '@/api/tasks/assign-task'
import { type CreateTaskBody, createTask } from '@/api/tasks/create-task'
import { type MoveTaskBody, moveTask } from '@/api/tasks/move-task'
import { type RemoveTaskParams, removeTask } from '@/api/tasks/remove-task'
import {
	type UpdateTaskBody,
	type UpdateTaskParams,
	updateTask,
} from '@/api/tasks/update-task'
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
		mutationFn: body => moveTask(body),
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
		mutationFn: body => createTask(body),
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
		mutationFn: params => removeTask(params),
		...options,
	})

export const updateTaskMutationOptions = (
	options?: Omit<
		MutationOptions<
			unknown,
			Error,
			{ params: UpdateTaskParams; body: UpdateTaskBody },
			{ prevBoard?: BoardWithColumnsAndTasks }
		>,
		'mutationFn'
	>
) =>
	mutationOptions({
		mutationFn: ({ params, body }) => updateTask(params, body),
		...options,
	})

export const assignTaskMutationOptions = (
	options?: Omit<
		MutationOptions<
			unknown,
			Error,
			AssignTaskParams,
			{ prevBoard?: BoardWithColumnsAndTasks }
		>,
		'mutationFn'
	>
) =>
	mutationOptions({
		mutationFn: ({ taskId, assignedBy }) => assignTask({ taskId, assignedBy }),
		...options,
	})
