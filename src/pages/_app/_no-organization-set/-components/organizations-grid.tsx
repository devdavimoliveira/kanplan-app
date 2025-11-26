import { useSuspenseQuery } from '@tanstack/react-query'
import { OrganizationCard } from './organization-card'
import { organizationsQueryOptions } from '@/queries/organization-queries'

export function OrganizationsGrid() {
	const {
		data: { data: organizations },
	} = useSuspenseQuery(organizationsQueryOptions())

	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{organizations?.map(organization => (
				<OrganizationCard key={organization.id} organization={organization} />
			))}
		</div>
	)
}
