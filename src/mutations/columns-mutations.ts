import { type MutationOptions, mutationOptions } from '@tanstack/react-query'
import {
	type CreateColumnBody,
	createColumn,
} from '@/api/columns/create-column'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { Column } from '@/types/Column'

export const createColumnMutationOptions = (
	options?: Omit<
		MutationOptions<
			Column,
			Error,
			CreateColumnBody,
			{ prevBoard?: BoardWithColumnsAndTasks }
		>,
		'mutationFn'
	>
) =>
	mutationOptions({
		mutationFn: (body: CreateColumnBody) => createColumn(body),
		...options,
	})
