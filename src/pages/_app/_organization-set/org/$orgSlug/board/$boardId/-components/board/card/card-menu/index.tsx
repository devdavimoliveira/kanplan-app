import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Bolt, Trash2 } from 'lucide-react'
import { Button } from '@/components/button'
import type { Task } from '@/types/Task'
import { ChangeMarkingColorDropdown } from './change-marking-color-dropdown'
import { RemoveCardDialog } from './remove-card-dialog'
import { MoveCardDialog } from './move-card-dialog'
import { Can } from '@/contexts/ability-context'
import { AssignButton } from './assign-button'

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
						<AssignButton task={task} />
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild>
						<Can I='update' a='Task'>
							<ChangeMarkingColorDropdown
								taskId={task.id}
								currentColor={task.markingColor ?? boardHighlightColor}
							/>
						</Can>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild>
						<Can I='update' a='Task'>
							<MoveCardDialog taskId={task.id} />
						</Can>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild>
						<Can I='delete' a='Task'>
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
						</Can>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
