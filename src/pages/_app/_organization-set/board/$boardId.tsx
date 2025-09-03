import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { boardByIdQueryOptions } from '@/queries/boards-queries'

export const Route = createFileRoute('/_app/_organization-set/board/$boardId')({
	component: Board,
})

function Board() {
	const { boardId } = Route.useParams()

	const { data, isLoading } = useQuery(boardByIdQueryOptions({ boardId }))

	return <div>{isLoading ? 'carregando...' : data?.name}</div>
}
