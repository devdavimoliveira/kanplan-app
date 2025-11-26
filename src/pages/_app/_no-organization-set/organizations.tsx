import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/button'
import { NewOrganizationDialog } from '@/components/new-organization-dialog'
import { Suspense } from 'react'
import { OrganizationsGrid } from './-components/organizations-grid'
import { organizationsQueryOptions } from '@/queries/organization-queries'
import { OrganizationsGridFallback } from './-components/organizations-grid-fallback'

export const Route = createFileRoute(
	'/_app/_no-organization-set/organizations'
)({
	loader: async ({ context: { queryClient } }) => {
		queryClient.prefetchQuery(organizationsQueryOptions())
	},
	component: Organizations,
})

function Organizations() {
	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Suas Organizações</h1>

			<NewOrganizationDialog
				trigger={<Button className='h-8 w-fit px-2'>Nova organização</Button>}
			/>

			<Suspense fallback={<OrganizationsGridFallback />}>
				<OrganizationsGrid />
			</Suspense>
		</div>
	)
}
