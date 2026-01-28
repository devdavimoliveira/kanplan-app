import { useRouteContext } from '@tanstack/react-router'
import { UserCheck, UserX } from 'lucide-react'
import { Button } from '@/components/button'
import { Tooltip } from '@/components/tooltip'
import type { Task } from '@/types/Task'
import { AssignCardDialog } from '../assign-card-dialog'

interface AssignButtonProps {
	task: Task
}

export function AssignButton({ task }: AssignButtonProps) {
	const { activeMember } = useRouteContext({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	const assignedByMe = task.assignedBy === activeMember.userId
	const isAssigned = !!task.assignedBy

	return (
		<>
			{assignedByMe ? (
				<AssignCardDialog
					trigger={
						<Button
							type='button'
							variant='raw'
							className='justify-start gap-2 p-1'
						>
							<UserX size={18} />
							Deixar tarefa
						</Button>
					}
					task={task}
				/>
			) : (
				<Tooltip
					side='bottom'
					content='Tarefa já atribuída a outra pessoa'
					disabled={!isAssigned || assignedByMe}
				>
					<AssignCardDialog
						trigger={
							<Button
								type='button'
								variant='raw'
								className='justify-start gap-2 p-1'
								disabled={isAssigned && !assignedByMe}
							>
								<UserCheck size={18} />
								Atribuir a mim
							</Button>
						}
						task={task}
					/>
				</Tooltip>
			)}
		</>
	)
}
