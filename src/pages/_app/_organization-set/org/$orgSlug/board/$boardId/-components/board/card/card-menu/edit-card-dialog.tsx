import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { produce } from 'immer'
import { PenLine, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { updateTaskMutationOptions } from '@/mutations/tasks-mutations'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { Task } from '@/types/Task'
import { cn } from '@/utils/cn'

const editCardSchema = z.object({
	description: z.string().nonempty('Insira a descrição da tarefa'),
})

type EditCardFormType = z.infer<typeof editCardSchema>

interface EditCardDialogProps {
	task: Task
}

export function EditCardDialog({ task }: EditCardDialogProps) {
	const [open, setOpen] = useState(false)

	const queryClient = useQueryClient()

	const { boardId } = useParams({
		from: '/_app/_organization-set/org/$orgSlug/board/$boardId/',
	})

	const { mutate } = useMutation(
		updateTaskMutationOptions({
			onMutate: async ({ params: { taskId }, body: { description } }) => {
				await queryClient.cancelQueries({ queryKey: ['board', boardId] })

				const prevBoard = queryClient.getQueryData<BoardWithColumnsAndTasks>([
					'board',
					boardId,
				])

				if (!description) return { prevBoard }

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
							draft.columns[columnIndex].tasks[taskIndex].description =
								description
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

	const {
		handleSubmit,
		register,
		formState: { isDirty, errors },
	} = useForm<EditCardFormType>({
		resolver: zodResolver(editCardSchema),
		values: {
			description: task.description,
		},
	})

	function handleSave(data: EditCardFormType) {
		mutate(
			{
				params: { taskId: task.id },
				body: { description: data.description },
			},
			{
				onError: () =>
					toast.error('Ocorreu um erro ao alterar a descrição da tarefa'),
				onSettled: () => setOpen(false),
			}
		)
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button type='button' variant='raw' className='justify-start gap-2 p-1'>
					<PenLine size={18} />
					Editar tarefa
				</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>Editar tarefa</Dialog.Title>

					<VisuallyHidden>
						<Dialog.Description>Editando tarefa</Dialog.Description>
					</VisuallyHidden>

					<div className='h-px bg-zinc-500' />

					<form
						className='flex flex-col gap-4 p-4'
						onSubmit={handleSubmit(handleSave)}
					>
						<div className='flex flex-col gap-1'>
							<textarea
								rows={3}
								placeholder='Insira a descrição da tarefa'
								className={cn(
									'w-full resize-none rounded-lg p-2 outline-2 outline-zinc-800 focus-visible:outline-cyan-500 focus-visible:outline-solid',
									errors?.description && 'focus-visible:outline-red-500'
								)}
								{...register('description')}
							/>
							{errors?.description && (
								<span className='ml-2 text-red-500'>
									{errors.description.message}
								</span>
							)}
						</div>

						<div className='flex flex-col gap-1 self-end text-sm text-zinc-600'>
							<div className='flex items-center gap-1'>
								<span>Atribuído a:</span>
								{task.assignedUser && (
									<Avatar
										src={task.assignedUser?.image ?? ''}
										alt={task.assignedUser.name.slice(0, 2)}
										fallback={task.assignedUser.name.slice(0, 2)}
										className='size-7'
									/>
								)}
								{task.assignedUser?.name ?? (
									<span className='font-bold text-red-500'>Ninguém</span>
								)}
							</div>

							<div className='flex items-center gap-1'>
								<span>Criado por:</span>
								<Avatar
									src={task.createdUser?.image ?? ''}
									alt={task.createdUser?.name.slice(0, 2)}
									fallback={task.createdUser?.name.slice(0, 2)}
									className='size-7'
								/>
								<span className='font-bold'>{task.createdUser.name}</span>
							</div>
						</div>

						<Button disabled={!isDirty}>Salvar</Button>
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
