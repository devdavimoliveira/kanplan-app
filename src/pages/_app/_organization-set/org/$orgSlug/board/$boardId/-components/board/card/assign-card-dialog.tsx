import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouteContext } from '@tanstack/react-router'
import { produce } from 'immer'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/button'
import { assignTaskMutationOptions } from '@/mutations/tasks-mutations'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { Task } from '@/types/Task'

interface AssignCardDialogProps {
	trigger: ReactNode
	task: Task
}

export function AssignCardDialog({ trigger, task }: AssignCardDialogProps) {
	const queryClient = useQueryClient()

	const { boardId } = useParams({
		from: '/_app/_organization-set/org/$orgSlug/board/$boardId/',
	})

	const { activeMember } = useRouteContext({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	const assignedByMe = task.assignedBy === activeMember.userId

	const { mutate } = useMutation(
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

						return produce(old, draft => {
							draft.columns[prevColumnIndex].tasks[prevTaskIndex].assignedBy =
								assignedBy

							draft.columns[prevColumnIndex].tasks[prevTaskIndex].assignedUser =
								assignedBy
									? {
											id: assignedBy,
											name: activeMember.user.name,
											image: activeMember.user?.image ?? '',
										}
									: null
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

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>
						{`${assignedByMe ? 'Deixar' : 'Atribuir'} tarefa`}
					</Dialog.Title>

					<div className='h-px bg-zinc-500' />

					<Dialog.Description className='p-4 text-sm text-zinc-500'>
						{`Deseja realmente ${assignedByMe ? 'deixar' : 'assumir'} esta tarefa?`}
					</Dialog.Description>

					<div className='flex justify-end gap-4 p-4'>
						<Dialog.Close asChild>
							<Button type='button' variant='warning' className='w-16'>
								Não
							</Button>
						</Dialog.Close>
						{assignedByMe ? (
							<Button
								type='button'
								className='px-2'
								onClick={() => mutate({ taskId: task.id, assignedBy: null })}
							>
								Sim, deixar
							</Button>
						) : (
							<Button
								type='button'
								className='px-2'
								onClick={() =>
									mutate({ taskId: task.id, assignedBy: activeMember.userId })
								}
							>
								Sim, assumir
							</Button>
						)}
					</div>

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
