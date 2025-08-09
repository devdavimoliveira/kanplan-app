import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/button'
import { useListOrganizations } from '@/lib/auth-client'
import { OrganizationCard } from './-components/organization-card'
import { OrganizationCardSkeleton } from './-components/organization-card-skeleton'

export const Route = createFileRoute(
	'/_app/_no-organization-set/organizations'
)({
	component: Organizations,
})

function Organizations() {
	const { data, isPending } = useListOrganizations()

	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Suas Organizações</h1>
			<Button type='button' className='h-8 w-fit px-2'>
				Nova organização
			</Button>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{isPending
					? Array.from({ length: 3 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: index for skeletons
							<OrganizationCardSkeleton key={index} />
						))
					: data?.map(organization => (
							<OrganizationCard
								key={organization.id}
								organization={organization}
							/>
						))}
			</div>
		</div>
	)
}
