import { getBoardsByOrganizationId } from '@/api/organization/get-boards-by-organization-id'
import { organization } from '@/lib/auth/auth-client'
import { queryOptions } from '@tanstack/react-query'

export const boardsByOrganizationIdQueryOptions = ({
	organizationId,
}: {
	organizationId: string
}) =>
	queryOptions({
		queryKey: ['boards', organizationId],
		queryFn: () => getBoardsByOrganizationId({ organizationId }),
	})

export const activeOrganizationQueryOptions = () =>
	queryOptions({
		queryKey: ['active-organization'],
		queryFn: () =>
			organization.getFullOrganization({
				query: { membersLimit: 0 },
			}),
	})

type OrganizationBySlugQueryOptions = {
	organizationSlug: string
}

export const organizationBySlugQueryOptions = ({
	organizationSlug,
}: OrganizationBySlugQueryOptions) =>
	queryOptions({
		queryKey: ['organization', organizationSlug],
		queryFn: () =>
			organization.getFullOrganization({
				query: { organizationSlug, membersLimit: 0 },
			}),
	})

export const activeMemberQueryOptions = () =>
	queryOptions({
		queryKey: ['active-member'],
		queryFn: () => organization.getActiveMember(),
	})

export const organizationsQueryOptions = () =>
	queryOptions({
		queryKey: ['organizations'],
		queryFn: () => organization.list(),
	})
