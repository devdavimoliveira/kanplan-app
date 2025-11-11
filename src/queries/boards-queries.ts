import { queryOptions } from '@tanstack/react-query'
import { getBoardsByOrganizationId } from '@/api/boards/get-boards-by-organization-id'
import { getBoardWithDetailsById } from '@/api/boards/get-board-with-details-by-id'

export const boardsByOrganizationIdQueryOptions = (organizationId: string) =>
	queryOptions({
		queryKey: ['boards', organizationId],
		queryFn: () => getBoardsByOrganizationId({ organizationId }),
	})

export const boardByIdQueryOptions = ({ boardId }: { boardId: string }) =>
	queryOptions({
		queryKey: ['board', boardId],
		queryFn: () => getBoardWithDetailsById({ boardId }),
	})
