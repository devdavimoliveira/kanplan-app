import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Avatar } from '@/components/avatar'
import type { Task } from '@/types/Task'
import { cn } from '@/utils/cn'

interface BoardCardProps {
	task: Task
}

export function BoardCard({ task }: BoardCardProps) {
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
			{...listeners}
			className={cn(
				'flex cursor-grab flex-col gap-2.5 rounded-lg bg-zinc-800 px-2 py-4 shadow-card',
				isDragging && 'cursor-grabbing opacity-50'
			)}
		>
			<p className='text-center'>{task.description}</p>
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
