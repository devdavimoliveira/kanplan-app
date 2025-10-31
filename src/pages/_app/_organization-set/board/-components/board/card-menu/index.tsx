import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoveRight, PenTool, Trash2, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/button'
import type { Task } from '@/types/Task'
import { RemoveCardDialog } from './remove-card-dialog'

interface CardMenuProps {
	task: Task
	children: ReactNode
}

export function CardMenu({ task, children }: CardMenuProps) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					align='start'
					sideOffset={10}
					className='flex min-w-40 flex-col gap-2 rounded-lg bg-zinc-900 p-2 shadow-md shadow-zinc-900/50'
				>
					<DropdownMenu.Item asChild>
						<Button
							type='button'
							variant='raw'
							className='justify-start gap-2 p-1'
						>
							<Users size={18} />
							Alterar membros
						</Button>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild>
						<Button
							type='button'
							variant='raw'
							className='justify-start gap-2 p-1'
						>
							<PenTool size={18} />
							Alterar cor de marcação
						</Button>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild>
						<Button
							type='button'
							variant='raw'
							className='justify-start gap-2 p-1'
						>
							<MoveRight size={18} />
							Mover
						</Button>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild>
						<RemoveCardDialog taskId={task.id}>
							<Button
								type='button'
								variant='raw'
								className='justify-start gap-2 p-1'
							>
								<Trash2 size={18} />
								Remover
							</Button>
						</RemoveCardDialog>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
