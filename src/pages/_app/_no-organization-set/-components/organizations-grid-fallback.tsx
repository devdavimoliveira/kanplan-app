import { OrganizationCardSkeleton } from './organization-card-skeleton'

export function OrganizationsGridFallback() {
	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{Array.from({ length: 3 }).map((_, index) => (
				<OrganizationCardSkeleton key={index} />
			))}
		</div>
	)
}
