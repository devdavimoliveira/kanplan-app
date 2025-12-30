import { Link, useMatchRoute, useParams } from '@tanstack/react-router'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import { cn } from '@/utils/cn'
import { NewColumnButton } from './new-column-button'
import { Can } from '@/contexts/ability-context'

interface BoardToolbarProps {
	board: BoardWithColumnsAndTasks
}

export function BoardToolbar({ board }: BoardToolbarProps) {
	const matchRoute = useMatchRoute()

	const isActive = !!matchRoute({ to: '/org/$orgSlug/board/$boardId' })

	const { orgSlug } = useParams({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	return (
		<div className='flex h-10 items-center justify-between'>
			<Link
				to='/org/$orgSlug/board/$boardId'
				params={{ orgSlug, boardId: board.id }}
				className={cn(
					'group flex h-full border-transparent border-b py-1 text-sm transition-colors duration-300',
					isActive && 'border-cyan-500'
				)}
			>
				<div className='flex items-center rounded px-2 transition-colors duration-300 group-hover:bg-zinc-800/50'>
					Visualização
				</div>
			</Link>

			<Can I='create' a='Column'>
				<NewColumnButton board={board} />
			</Can>
		</div>
	)
}
