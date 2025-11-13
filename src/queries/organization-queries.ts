import { organization } from '@/lib/auth/auth-client'
import { queryOptions } from '@tanstack/react-query'

export const organizationQueryOptions = () =>
	queryOptions({
		queryKey: ['organization'],
		queryFn: () =>
			organization.getFullOrganization({ query: { membersLimit: 0 } }),
	})

export const activeMemberQueryOptions = () =>
	queryOptions({
		queryKey: ['active-member'],
		queryFn: () => organization.getActiveMember(),
	})
