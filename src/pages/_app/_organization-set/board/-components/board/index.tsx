import {
	DndContext,
	type DragEndEvent,
	type DragMoveEvent,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useImmer } from 'use-immer'
import { moveTaskMutationOptions } from '@/mutations/tasks-mutations'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import { BoardCard } from './card'
import { BoardColumn } from './column'

interface BoardProps {
	data: BoardWithColumnsAndTasks
}

export function Board({ data }: BoardProps) {
	const queryClient = useQueryClient()

	const [board, setBoard] = useImmer<BoardWithColumnsAndTasks>(data)
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

	const { mutate } = useMutation(
		moveTaskMutationOptions({
			onMutate: async () => {
				await queryClient.cancelQueries({ queryKey: ['board', data.id] })

				const prevBoard = queryClient.getQueryData<BoardWithColumnsAndTasks>([
					'board',
					data.id,
				])

				queryClient.setQueryData(['board', data.id], board)

				return { prevBoard }
			},
			onError: (_error, _variables, context) => {
				if (!context?.prevBoard) return

				queryClient.setQueryData(['board', data.id], context.prevBoard)
				setBoard(context.prevBoard)
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: ['board', data.id] })
			},
		})
	)

	function handleDragMove(event: DragMoveEvent) {
		const { active, over } = event

		if (!active || !over) return

		setBoard(draft => {
			// handle task sorting
			if (
				active.data.current?.type === 'task' &&
				over.data.current?.type === 'task' &&
				active.id !== over.id
			) {
				const activeColumnIndex = draft.columns.findIndex(column =>
					column.tasks.find(task => task.id === active.id)
				)

				const overColumnIndex = draft.columns.findIndex(column =>
					column.tasks.find(task => task.id === over.id)
				)

				const activeTaskIndex = draft.columns[
					activeColumnIndex
				].tasks.findIndex(task => task.id === active.id)
				const overTaskIndex = draft.columns[overColumnIndex].tasks.findIndex(
					task => task.id === over.id
				)

				// handle task sorting in the same column
				if (activeColumnIndex === overColumnIndex) {
					draft.columns[activeColumnIndex].tasks = arrayMove(
						draft.columns[activeColumnIndex].tasks,
						activeTaskIndex,
						overTaskIndex
					)
				} else {
					// handle task sorting between columns
					const [removedTask] = draft.columns[activeColumnIndex].tasks.splice(
						activeTaskIndex,
						1
					)

					draft.columns[overColumnIndex].tasks.splice(
						overTaskIndex,
						0,
						removedTask
					)
				}
			}

			//handle task drop into a column
			if (
				active.data.current?.type === 'task' &&
				over.data.current?.type === 'column' &&
				active.id !== over.id
			) {
				const activeColumnIndex = draft.columns.findIndex(column =>
					column.tasks.find(task => task.id === active.id)
				)

				const overColumnIndex = draft.columns.findIndex(
					column => column.id === over.id
				)

				const activeTaskIndex = draft.columns[
					activeColumnIndex
				].tasks.findIndex(task => task.id === active.id)

				const [removedTask] = draft.columns[activeColumnIndex].tasks.splice(
					activeTaskIndex,
					1
				)

				draft.columns[overColumnIndex].tasks.push(removedTask)
			}
		})
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active } = event

		const activeColumnIndex = board.columns.findIndex(column =>
			column.tasks.find(task => task.id === active.id)
		)

		const activeColumnId = board.columns[activeColumnIndex].id

		const activeTaskIndex = board.columns[activeColumnIndex].tasks.findIndex(
			task => task.id === active.id
		)

		const beforeTaskId =
			board.columns[activeColumnIndex].tasks[activeTaskIndex - 1]?.id ?? null

		const afterTaskId =
			board.columns[activeColumnIndex].tasks[activeTaskIndex + 1]?.id ?? null

		mutate({
			taskId: active.id as string,
			newColumnId: activeColumnId,
			beforeTaskId,
			afterTaskId,
		})
	}

	return (
		<div className='flex gap-4'>
			<DndContext
				sensors={sensors}
				onDragMove={handleDragMove}
				onDragEnd={handleDragEnd}
			>
				{board.columns.map(column => (
					<SortableContext
						key={column.id}
						items={column.tasks.map(task => task.id)}
					>
						<BoardColumn column={column} highlightColor={data.highlightColor}>
							{column.tasks.map(task => (
								<BoardCard key={task.id} task={task} />
							))}
						</BoardColumn>
					</SortableContext>
				))}
			</DndContext>
		</div>
	)
}
