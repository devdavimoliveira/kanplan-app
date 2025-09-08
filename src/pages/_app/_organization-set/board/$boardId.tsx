import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { boardByIdQueryOptions } from '@/queries/boards-queries'
import { Board as KanbanBoard } from './-components/board'

export const Route = createFileRoute('/_app/_organization-set/board/$boardId')({
	component: Board,
})

function Board() {
	const { boardId } = Route.useParams()

	const { data, isLoading } = useQuery(boardByIdQueryOptions({ boardId }))

	return (
		<div className='mx-auto max-w-5xl py-8'>
			{isLoading ? (
				<p>carregando...</p>
			) : !data ? (
				<p>Quadro nao existe</p>
			) : (
				<KanbanBoard data={data} />
			)}
		</div>
	)
}
