import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouteContext } from '@tanstack/react-router'
import { produce } from 'immer'
import { UserCheck, UserX } from 'lucide-react'
import { Button } from '@/components/button'
import { Tooltip } from '@/components/tooltip'
import { assignTaskMutationOptions } from '@/mutations/tasks-mutations'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { Task } from '@/types/Task'

interface AssignButtonProps {
	task: Task
}

export function AssignButton({ task }: AssignButtonProps) {
	const queryClient = useQueryClient()

	const { boardId } = useParams({
		from: '/_app/_organization-set/org/$orgSlug/board/$boardId/',
	})

	const { activeMember } = useRouteContext({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	const assignedByMe = task.assignedBy === activeMember.userId
	const isAssigned = !!task.assignedBy

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
		<>
			{assignedByMe ? (
				<Button
					type='button'
					variant='raw'
					className='justify-start gap-2 p-1'
					onClick={() => mutate({ taskId: task.id, assignedBy: null })}
				>
					<UserX size={18} />
					Deixar tarefa
				</Button>
			) : (
				<Tooltip
					side='bottom'
					content='Tarefa já atribuída a outra pessoa'
					disabled={!isAssigned || assignedByMe}
				>
					<Button
						type='button'
						variant='raw'
						className='justify-start gap-2 p-1'
						onClick={() =>
							mutate({ taskId: task.id, assignedBy: activeMember.userId })
						}
						disabled={isAssigned && !assignedByMe}
					>
						<UserCheck size={18} />
						Atribuir a mim
					</Button>
				</Tooltip>
			)}
		</>
	)
}
