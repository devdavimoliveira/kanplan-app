import { OrganizationCard } from './organization-card'
import { useListOrganizations } from '@/lib/auth/auth-client'
import { OrganizationCardSkeleton } from './organization-card-skeleton'

export function OrganizationsGrid() {
	const { data: organizations, isPending } = useListOrganizations()

	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{isPending
				? Array.from({ length: 3 }).map((_, index) => (
						<OrganizationCardSkeleton key={index} />
					))
				: organizations?.map(organization => (
						<OrganizationCard
							key={organization.id}
							organization={organization}
						/>
					))}
		</div>
	)
}
