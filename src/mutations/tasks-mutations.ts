import { type MutationOptions, mutationOptions } from '@tanstack/react-query'
import { type MoveTaskBody, moveTask } from '@/api/tasks/move-task'
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
