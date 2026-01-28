import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Plus } from 'lucide-react'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Can } from '@/contexts/ability-context'
import type { Task } from '@/types/Task'
import { cn } from '@/utils/cn'
import { CardMenu } from './card-menu'

interface BoardCardProps {
	task: Task
	boardHighlightColor: string
}

export function BoardCard({ task, boardHighlightColor }: BoardCardProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id, data: { type: 'task' } })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			className={cn(
				'flex flex-col gap-2 rounded-lg bg-zinc-800 p-4 shadow-card',
				isDragging && 'opacity-50'
			)}
		>
			<div className='flex items-center justify-between'>
				<div
					className='h-2 w-14 rounded-full'
					style={{ backgroundColor: task.markingColor ?? boardHighlightColor }}
				/>
				<div className='flex gap-2'>
					<CardMenu task={task} boardHighlightColor={boardHighlightColor} />
					<Can I='update' a='Task'>
						<Button
							variant='ghost'
							type='button'
							className={cn(
								'h-auto cursor-grab',
								isDragging && 'cursor-grabbing'
							)}
							{...listeners}
						>
							<GripVertical size={18} />
						</Button>
					</Can>
				</div>
			</div>
			<p className='text-justify'>{task.description}</p>
			<div className='flex items-center justify-between'>
				{task.assignedUser ? (
					<Avatar
						src={task.assignedUser.image ?? ''}
						alt='Avatar'
						fallback={task.assignedUser.name.slice(0, 2)}
						className='bg-zinc-900'
					/>
				) : (
					<Button
						variant='outline'
						type='button'
						className='size-8 rounded-full'
					>
						<Plus size={18} />
					</Button>
				)}
			</div>
		</li>
	)
}
