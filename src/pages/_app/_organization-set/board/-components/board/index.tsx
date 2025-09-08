import {
	DndContext,
	type DragMoveEvent,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useImmer } from 'use-immer'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { ColumnWithTasks } from '@/types/Column'
import { BoardCard } from './card'
import { BoardColumn } from './column'

interface BoardProps {
	data: BoardWithColumnsAndTasks
}

export function Board({ data }: BoardProps) {
	const [columns, setColumns] = useImmer<ColumnWithTasks[]>(data.columns)
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

	function handleDragMove(event: DragMoveEvent) {
		const { active, over } = event

		// handle task sorting
		if (
			active &&
			over &&
			active.data.current?.type === 'task' &&
			over.data.current?.type === 'task' &&
			active.id !== over.id
		) {
			const activeColumnIndex = columns.findIndex(column =>
				column.tasks.find(task => task.id === active.id)
			)

			const overColumnIndex = columns.findIndex(column =>
				column.tasks.find(task => task.id === over.id)
			)

			const activeTaskIndex = columns[activeColumnIndex].tasks.findIndex(
				task => task.id === active.id
			)
			const overTaskIndex = columns[overColumnIndex].tasks.findIndex(
				task => task.id === over.id
			)

			// handle task sorting in the same column
			if (activeColumnIndex === overColumnIndex) {
				setColumns(draft => {
					draft[activeColumnIndex].tasks = arrayMove(
						draft[activeColumnIndex].tasks,
						activeTaskIndex,
						overTaskIndex
					)
				})
			} else {
				// handle task sorting between columns
				setColumns(draft => {
					const [removedTask] = draft[activeColumnIndex].tasks.splice(
						activeTaskIndex,
						1
					)

					draft[overColumnIndex].tasks.splice(overTaskIndex, 0, removedTask)
				})
			}
		}

		//handle task drop into a column
		if (
			active &&
			over &&
			active.data.current?.type === 'task' &&
			over.data.current?.type === 'column' &&
			active.id !== over.id
		) {
			const activeColumnIndex = columns.findIndex(column =>
				column.tasks.find(task => task.id === active.id)
			)

			const overColumnIndex = columns.findIndex(column => column.id === over.id)

			const activeTaskIndex = columns[activeColumnIndex].tasks.findIndex(
				task => task.id === active.id
			)

			setColumns(draft => {
				const [removedTask] = draft[activeColumnIndex].tasks.splice(
					activeTaskIndex,
					1
				)

				draft[overColumnIndex].tasks.push(removedTask)
			})
		}
	}

	return (
		<div className='flex gap-4'>
			<DndContext sensors={sensors} onDragMove={handleDragMove}>
				{columns.map(column => (
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
