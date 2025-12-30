import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Bolt, Trash2, Users } from 'lucide-react'
import { Button } from '@/components/button'
import type { Task } from '@/types/Task'
import { ChangeMarkingColorDropdown } from './change-marking-color-dropdown'
import { RemoveCardDialog } from './remove-card-dialog'
import { MoveCardDialog } from './move-card-dialog'

interface CardMenuProps {
	task: Task
	boardHighlightColor: string
}

export function CardMenu({ task, boardHighlightColor }: CardMenuProps) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Button
					variant='ghost'
					type='button'
					title='Opções do cartão'
					className='h-auto'
				>
					<Bolt size={18} />
				</Button>
			</DropdownMenu.Trigger>
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
						<ChangeMarkingColorDropdown
							taskId={task.id}
							currentColor={task.markingColor ?? boardHighlightColor}
						/>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild>
						<MoveCardDialog taskId={task.id} />
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
