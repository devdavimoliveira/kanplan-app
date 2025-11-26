import { BoardCardSkeleton } from './board-card-skeleton'

export function BoardsGridFallback() {
	return (
		<div className='grid xs:grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
			{Array.from({ length: 4 }).map((_, index) => (
				<BoardCardSkeleton key={index} />
			))}
		</div>
	)
}
