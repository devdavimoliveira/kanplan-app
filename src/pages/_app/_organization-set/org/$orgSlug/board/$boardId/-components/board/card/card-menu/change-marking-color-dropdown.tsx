import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { produce } from 'immer'
import { PenTool, X } from 'lucide-react'
import { useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { toast } from 'sonner'
import { Button } from '@/components/button'
import { updateTaskMutationOptions } from '@/mutations/tasks-mutations'
import type { BoardWithColumnsAndTasks } from '@/types/Board'

interface ChangeMarkingColorDropdownProps {
	taskId: string
	currentColor: string
}

export function ChangeMarkingColorDropdown({
	taskId,
	currentColor,
}: ChangeMarkingColorDropdownProps) {
	const queryClient = useQueryClient()

	const { boardId } = useParams({
		from: '/_app/_organization-set/org/$orgSlug/board/$boardId/',
	})

	const [colorPickerOpen, setColorPickerOpen] = useState(false)
	const [color, setColor] = useState(currentColor)

	const { mutate } = useMutation(
		updateTaskMutationOptions({
			onMutate: async () => {
				await queryClient.cancelQueries({ queryKey: ['board', boardId] })

				const prevBoard = queryClient.getQueryData<BoardWithColumnsAndTasks>([
					'board',
					boardId,
				])

				queryClient.setQueryData(
					['board', boardId],
					(old: BoardWithColumnsAndTasks) => {
						const columnIndex = old.columns.findIndex(column =>
							column.tasks.some(task => task.id === taskId)
						)

						const taskIndex = old.columns[columnIndex].tasks.findIndex(
							task => task.id === taskId
						)

						return produce(old, draft => {
							draft.columns[columnIndex].tasks[taskIndex].markingColor = color
						})
					}
				)

				return { prevBoard }
			},
			onError: (_, __, context) => {
				if (context?.prevBoard) {
					queryClient.setQueryData(['board', boardId], context.prevBoard)
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: ['board', boardId] })
			},
		})
	)

	function toggleColorPicker() {
		setColorPickerOpen(prev => !prev)
	}

	function handleChangeColor() {
		if (currentColor !== color) {
			mutate(
				{ params: { taskId }, body: { markingColor: color } },
				{
					onError: () =>
						toast.error('Ocorreu um erro ao alterar a cor de marcação'),
					onSettled: () => setColorPickerOpen(false),
				}
			)
		} else {
			setColorPickerOpen(false)
		}
	}

	return (
		<div className='relative flex'>
			<Button
				type='button'
				variant='raw'
				className='justify-start gap-2 p-1'
				onClick={toggleColorPicker}
			>
				<PenTool size={18} />
				Alterar cor de marcação
			</Button>
			{colorPickerOpen && (
				<div className='absolute top-8 left-2 flex flex-col gap-4 rounded-lg bg-zinc-900 p-2 shadow-card'>
					<Button
						type='button'
						variant='raw'
						className='size-7 self-end'
						onClick={toggleColorPicker}
					>
						<X size={24} />
					</Button>

					<HexColorPicker color={color} onChange={setColor} />
					<HexColorInput
						prefixed
						className='h-8 w-full rounded-lg bg-zinc-800 px-2 text-right focus-visible:outline-2 focus-visible:outline-cyan-600'
						color={color}
						onChange={setColor}
					/>

					<Button type='button' onClick={handleChangeColor}>
						Alterar cor
					</Button>
				</div>
			)}
		</div>
	)
}
