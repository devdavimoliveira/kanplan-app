import { Link, useMatchRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/button'
import type { Board } from '@/types/Board'
import { cn } from '@/utils/cn'

interface BoardToolbarProps {
	board: Board
}

export function BoardToolbar({ board }: BoardToolbarProps) {
	const matchRoute = useMatchRoute()

	const isActive = !!matchRoute({ to: '/board/$boardId' })

	return (
		<div className='flex h-10 items-center justify-between'>
			<Link
				to='/board/$boardId'
				params={{ boardId: board.id }}
				className={cn(
					'group flex h-full border-transparent border-b py-1 text-sm transition-colors duration-300',
					isActive && 'border-cyan-500'
				)}
			>
				<div className='flex items-center rounded px-2 transition-colors duration-300 group-hover:bg-zinc-800/50'>
					Visualização
				</div>
			</Link>

			<Button className='px-2'>
				<Plus className='mr-2 size-4.5' />
				Nova coluna
			</Button>
		</div>
	)
}
