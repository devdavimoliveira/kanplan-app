import { Link, useParams } from '@tanstack/react-router'
import type { Board } from '@/types/Board'

interface BoardCardProps {
	board: Board
}

export function BoardCard({ board }: BoardCardProps) {
	const { orgSlug } = useParams({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	return (
		<Link
			to='/org/$orgSlug/board/$boardId'
			params={{ orgSlug, boardId: board.id }}
		>
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
