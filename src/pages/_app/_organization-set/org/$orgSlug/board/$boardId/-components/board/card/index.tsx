import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
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
				</div>
			</div>
			<p className='text-justify'>{task.description}</p>
			<div className='flex items-center justify-between'>
				<Avatar
					src='https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'
					alt='Avatar'
					fallback='Av'
				/>
			</div>
		</li>
	)
}
