import { Link } from '@tanstack/react-router'
import type { Board } from '@/types/Board'

interface BoardCardProps {
	board: Board
}

export function BoardCard({ board }: BoardCardProps) {
	return (
		<Link to='/'>
			<div className='flex h-30 flex-col rounded-lg bg-zinc-900 shadow-card'>
				<div
					className='h-full rounded-t-lg'
					style={{ backgroundColor: board.highlightColor }}
				/>
				<span className='h-10 shrink-0 p-2'>{board.name}</span>
			</div>
		</Link>
	)
}
