import { queryOptions } from '@tanstack/react-query'
import { getBoardWithDetailsById } from '@/api/boards/get-board-with-details-by-id'

export const boardByIdQueryOptions = ({ boardId }: { boardId: string }) =>
	queryOptions({
		queryKey: ['board', boardId],
		queryFn: () => getBoardWithDetailsById({ boardId }),
	})
