import { Link, useMatchRoute } from '@tanstack/react-router'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import { cn } from '@/utils/cn'
import { NewColumnButton } from './new-column-button'

interface BoardToolbarProps {
	board: BoardWithColumnsAndTasks
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
			<NewColumnButton board={board} />
		</div>
	)
}
