import { useDroppable } from '@dnd-kit/core'
import { EllipsisVertical, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import colors from 'tailwindcss/colors'
import type { Column } from '@/types/Column'
import { cn } from '@/utils/cn'

interface BoardColumnProps {
	column: Column
	highlightColor: string
	children: ReactNode
}

export function BoardColumn({
	column,
	highlightColor,
	children,
}: BoardColumnProps) {
	const { setNodeRef } = useDroppable({
		id: column.id,
		data: { type: 'column' },
	})

	return (
		<div
			ref={setNodeRef}
			className={cn(
				'flex w-75 flex-col gap-4 rounded border-t-5 bg-zinc-900 p-4'
			)}
			style={{ borderColor: highlightColor ?? colors.cyan[600] }}
		>
			<div className='flex items-center justify-between'>
				<h2 className='font-bold text-xl'>{column.title}</h2>
				<div className='flex gap-2'>
					<button
						type='button'
						title='Adicionar nova tarefa'
						className='cursor-pointer'
					>
						<Plus size={20} />
					</button>
					<button type='button' title='Opções' className='cursor-pointer'>
						<EllipsisVertical size={20} />
					</button>
				</div>
			</div>
			<div className='flex flex-col gap-4'>{children}</div>
		</div>
	)
}
