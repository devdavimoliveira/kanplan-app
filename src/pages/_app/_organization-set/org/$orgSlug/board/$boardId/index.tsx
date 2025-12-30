import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { queryClient } from '@/lib/query-client'
import { boardByIdQueryOptions } from '@/queries/boards-queries'
import { Board as KanbanBoard } from './-components/board'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug/board/$boardId/')(
	{
		loader: ({ params: { boardId } }) => {
			queryClient.prefetchQuery(boardByIdQueryOptions({ boardId }))
		},
		component: Board,
	}
)

function Board() {
	const { boardId } = Route.useParams()

	return (
		<div className='mx-auto h-[calc(100%-var(--header-height))] max-w-7xl py-4'>
			<Suspense fallback={<p>carregando...</p>}>
				<KanbanBoard boardId={boardId} />
			</Suspense>
		</div>
	)
}
