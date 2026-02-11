import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouteContext } from '@tanstack/react-router'
import { produce } from 'immer'
import { CircleEllipsis, X } from 'lucide-react'
import { useId, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Can, useAbility } from '@/contexts/ability-context'
import {
	assignTaskMutationOptions,
	updateTaskMutationOptions,
} from '@/mutations/tasks-mutations'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { Task } from '@/types/Task'
import { cn } from '@/utils/cn'
import { AssignedUserSelect } from './assigned-user-select'

const editCardSchema = z.object({
	description: z.string().nonempty('Insira a descrição da tarefa'),
	assignedBy: z
		.string()
		.nullable()
		.transform(value => (value === '' ? null : value)),
})

export type EditCardFormType = z.infer<typeof editCardSchema>

interface EditCardDialogProps {
	task: Task
}

export function EditCardDialog({ task }: EditCardDialogProps) {
	const [open, setOpen] = useState(false)

	const { can } = useAbility()

	const canUpdateTask = can('update', 'Task')

	const queryClient = useQueryClient()

	const { boardId } = useParams({
		from: '/_app/_organization-set/org/$orgSlug/board/$boardId/',
	})

	const { activeOrganization, authUser } = useRouteContext({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	const descriptionFieldId = useId()

	const methods = useForm<EditCardFormType>({
		resolver: zodResolver(editCardSchema),
		values: {
			description: task.description,
			assignedBy: task.assignedBy ?? '',
		},
	})

	const {
		handleSubmit,
		register,
		formState: { isDirty, errors },
	} = methods

	const { mutate } = useMutation(
		updateTaskMutationOptions({
			onMutate: async ({
				params: { taskId },
				body: { description, assignedBy },
			}) => {
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

						const member = activeOrganization!.members.find(
							member => member.userId === assignedBy
						)

						const assignedUser = member
							? {
									id: member.userId,
									name: member.user.name,
									image: member.user.image ?? null,
								}
							: null

						return produce(old, draft => {
							draft.columns[columnIndex].tasks[taskIndex].description =
								description ?? ''

							draft.columns[columnIndex].tasks[taskIndex].assignedBy =
								assignedBy ?? null

							draft.columns[columnIndex].tasks[taskIndex].assignedUser =
								assignedUser
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

	function handleSave(data: EditCardFormType) {
		mutate(
			{
				params: { taskId: task.id },
				body: {
					description: data.description,
					assignedBy: data.assignedBy,
				},
			},
			{
				onError: () =>
					toast.error('Ocorreu um erro ao alterar a descrição da tarefa'),
				onSettled: () => setOpen(false),
			}
		)
	}

	const { mutate: assignTaskMutate } = useMutation(
		assignTaskMutationOptions({
			onMutate: async ({ assignedBy }) => {
				await queryClient.cancelQueries({ queryKey: ['board', boardId] })

				const prevBoard = queryClient.getQueryData<BoardWithColumnsAndTasks>([
					'board',
					boardId,
				])

				queryClient.setQueryData(
					['board', boardId],
					(old: BoardWithColumnsAndTasks) => {
						const prevColumnIndex = old.columns.findIndex(col =>
							col.tasks.some(t => t.id === task.id)
						)

						const prevTaskIndex = old.columns[prevColumnIndex].tasks.findIndex(
							t => t.id === task.id
						)

						const member = activeOrganization!.members.find(
							member => member.userId === assignedBy
						)

						const assignedUser = member
							? {
									id: member.userId,
									name: member.user.name,
									image: member.user.image ?? null,
								}
							: null

						return produce(old, draft => {
							draft.columns[prevColumnIndex].tasks[prevTaskIndex].assignedBy =
								assignedBy ?? null

							draft.columns[prevColumnIndex].tasks[prevTaskIndex].assignedUser =
								assignedUser
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

	function assignTask(assignedBy: string | null) {
		assignTaskMutate({ taskId: task.id, assignedBy })
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button type='button' variant='raw' className='justify-start gap-2 p-1'>
					<CircleEllipsis size={18} />
					Mais opções
				</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>
						Informações da tarefa
					</Dialog.Title>

					<VisuallyHidden>
						<Dialog.Description>Informações da tarefa</Dialog.Description>
					</VisuallyHidden>

					<div className='h-px bg-zinc-500' />

					<FormProvider {...methods}>
						<form
							className='flex flex-col gap-4 p-4'
							onSubmit={handleSubmit(handleSave)}
						>
							<div className='flex flex-col gap-2'>
								<label htmlFor={descriptionFieldId} className='ml-2 text-sm'>
									Descrição
								</label>
								<textarea
									id={descriptionFieldId}
									rows={3}
									placeholder='Insira a descrição da tarefa'
									className={cn(
										'w-full resize-none rounded-lg p-2 outline-2 outline-zinc-800 focus-visible:outline-cyan-500 focus-visible:outline-solid',
										errors?.description && 'focus-visible:outline-red-500'
									)}
									disabled={!canUpdateTask}
									{...register('description')}
								/>
								{errors?.description && (
									<span className='ml-2 text-red-500'>
										{errors.description.message}
									</span>
								)}
							</div>

							<div className='flex flex-col gap-2 self-end text-sm text-zinc-600'>
								<div className='flex flex-col gap-1'>
									<div className='flex items-center gap-1'>
										<span>Atribuído a:</span>
										<AssignedUserSelect />
									</div>
									<Can I='support' a='Task'>
										{task.assignedBy === null ? (
											<Button
												type='button'
												variant='link'
												className='h-auto self-end'
												onClick={() => assignTask(authUser.id)}
											>
												Atribuir a mim
											</Button>
										) : (
											task.assignedBy === authUser.id && (
												<Button
													type='button'
													variant='link'
													className='h-auto self-end'
													onClick={() => assignTask(null)}
												>
													Deixar tarefa
												</Button>
											)
										)}
									</Can>
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

							<Button disabled={!isDirty} hidden={!canUpdateTask}>
								Salvar
							</Button>
						</form>
					</FormProvider>

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
