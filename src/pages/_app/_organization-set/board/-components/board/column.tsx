import { useDroppable } from '@dnd-kit/core'
import { EllipsisVertical, Plus } from 'lucide-react'
import { useState } from 'react'
import colors from 'tailwindcss/colors'
import { Button } from '@/components/button'
import type { ColumnWithTasks } from '@/types/Column'
import { cn } from '@/utils/cn'
import { BoardCard } from './card'
import { CreateCardForm } from './create-card-form'

interface BoardColumnProps {
	column: ColumnWithTasks
	highlightColor: string
}

export function BoardColumn({ column, highlightColor }: BoardColumnProps) {
	const [isCreatingCard, setIsCreatingCard] = useState(false)

	const { setNodeRef } = useDroppable({
		id: column.id,
		data: { type: 'column' },
	})

	return (
		<div
			ref={setNodeRef}
			className={cn(
				'flex w-75 flex-col gap-2 rounded border-t-5 bg-zinc-900 p-4'
			)}
			style={{ borderColor: highlightColor ?? colors.cyan[600] }}
		>
			<div className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>{column.title}</h2>
				<Button
					variant='ghost'
					type='button'
					title='Opções'
					className='h-auto px-0.5 py-1.5'
				>
					<EllipsisVertical size={20} />
				</Button>
			</div>
			<ul className='flex flex-col gap-4'>
				{column.tasks.map(task => (
					<BoardCard key={task.id} task={task} />
				))}
				{isCreatingCard && (
					<li>
						<CreateCardForm
							column={column}
							onClose={() => setIsCreatingCard(false)}
						/>
					</li>
				)}
			</ul>
			{!isCreatingCard && (
				<Button
					variant='ghost'
					type='button'
					onClick={() => setIsCreatingCard(true)}
				>
					<Plus size={20} className='mr-2' />
					Adicionar um cartão
				</Button>
			)}
		</div>
	)
}
