import { useSuspenseQuery } from '@tanstack/react-query'
import { boardsByOrganizationIdQueryOptions } from '@/queries/boards-queries'
import { BoardCard } from './board-card'

interface BoardsGridProps {
	organizationId: string
}

export function BoardsGrid({ organizationId }: BoardsGridProps) {
	const { data: boards } = useSuspenseQuery(
		boardsByOrganizationIdQueryOptions({ organizationId })
	)

	return (
		<div className='grid xs:grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
			{boards?.map(board => (
				<BoardCard key={board.id} board={board} />
			))}
		</div>
	)
}
