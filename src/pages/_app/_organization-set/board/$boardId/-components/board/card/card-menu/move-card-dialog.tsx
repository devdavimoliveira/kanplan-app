import * as Dialog from '@radix-ui/react-dialog'
import { MoveRight, X } from 'lucide-react'
import { Button } from '@/components/button'
import { useParams } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { ColumnWithTasks } from '@/types/Column'
import { useState } from 'react'
import { moveTaskMutationOptions } from '@/mutations/tasks-mutations'
import { toast } from 'sonner'
import { produce } from 'immer'
import { Select } from '@/components/select'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface MoveCardDialogProps {
	taskId: string
}

const moveCardSchema = z.object({
	taskId: z.string(),
	columnId: z.string().nonempty('Selecione uma coluna'),
})

type MoveCardFormType = z.infer<typeof moveCardSchema>

export function MoveCardDialog({ taskId }: MoveCardDialogProps) {
	const [open, setOpen] = useState(false)

	const { boardId } = useParams({
		from: '/_app/_organization-set/board/$boardId/',
	})

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<MoveCardFormType>({
		resolver: zodResolver(moveCardSchema),
		values: {
			taskId,
			columnId: '',
		},
	})

	const selectedColumnId = watch('columnId')

	const queryClient = useQueryClient()

	const board = queryClient.getQueryData<BoardWithColumnsAndTasks>([
		'board',
		boardId,
	])

	function isCurrentTask(column: ColumnWithTasks, taskId: string) {
		return column.tasks.findIndex(task => task.id === taskId) !== -1
	}

	const { mutate } = useMutation(
		moveTaskMutationOptions({
			onMutate: () => {
				queryClient.cancelQueries({ queryKey: ['board', boardId] })

				const prevBoard = queryClient.getQueryData<BoardWithColumnsAndTasks>([
					'board',
					boardId,
				])

				queryClient.setQueryData(
					['board', boardId],
					(old: BoardWithColumnsAndTasks) => {
						const oldColumnIndex = old.columns.findIndex(column =>
							column.tasks.some(task => task.id === taskId)
						)

						const oldTaskIndex = old.columns[oldColumnIndex].tasks.findIndex(
							task => task.id === taskId
						)

						return produce(old, draft => {
							const task = draft.columns[oldColumnIndex].tasks.splice(
								oldTaskIndex,
								1
							)[0]

							const newColumnIndex = draft.columns.findIndex(
								column => column.id === selectedColumnId
							)

							draft.columns[newColumnIndex].tasks.unshift(task)
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

	function handleMoveTask(data: MoveCardFormType) {
		const firstTaskIdOfSelectedColumn = board?.columns.find(
			column => column.id === data.columnId
		)?.tasks[0]?.id

		mutate(
			{
				taskId: data.taskId,
				newColumnId: data.columnId,
				beforeTaskId: null,
				afterTaskId: firstTaskIdOfSelectedColumn ?? null,
			},
			{
				onError: () => {
					toast.error('Ocorreu um erro ao mover a tarefa')
				},
				onSuccess: () => {
					toast.success('Tarefa movida com sucesso')
				},
				onSettled: () => {
					setOpen(false)
				},
			}
		)
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button type='button' variant='raw' className='justify-start gap-2 p-1'>
					<MoveRight size={18} />
					Mover
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-[90vw] max-w-lg transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>Mover cartão</Dialog.Title>

					<div className='h-px bg-zinc-500' />

					<Dialog.Description className='p-4 text-sm text-zinc-500'>
						Selecione uma nova coluna para este cartão.
					</Dialog.Description>

					<form
						onSubmit={handleSubmit(handleMoveTask)}
						className='p-4 flex flex-col gap-4'
					>
						<div>
							<Select {...register('columnId')}>
								<option value=''>Selecione uma coluna</option>
								{board?.columns.map(column => (
									<option
										key={column.id}
										value={column.id}
										disabled={isCurrentTask(column, taskId)}
									>
										{column.title}
									</option>
								))}
							</Select>
							{errors.columnId && (
								<span className='ml-2 text-red-500'>
									{errors.columnId.message}
								</span>
							)}
						</div>

						<div className='flex justify-end gap-4'>
							<Dialog.Close asChild>
								<Button type='button' variant='warning' className='px-2'>
									Cancelar
								</Button>
							</Dialog.Close>
							<Button type='submit' className='px-2'>
								Mover
							</Button>
						</div>
					</form>

					<Dialog.Close asChild>
						<Button variant='raw' className='absolute top-2 right-1.5 p-0.5'>
							<X size={24} />
						</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
