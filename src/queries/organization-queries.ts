import { queryOptions } from '@tanstack/react-query'
import { getBoardsByOrganizationId } from '@/api/organization/get-boards-by-organization-id'

export const boardsByOrganizationIdQueryOptions = ({
	organizationId,
}: {
	organizationId: string
}) =>
	queryOptions({
		queryKey: ['boards', organizationId],
		queryFn: () => getBoardsByOrganizationId({ organizationId }),
	})
