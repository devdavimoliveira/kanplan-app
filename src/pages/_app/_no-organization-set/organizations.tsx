import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/button'
import { NewOrganizationDialog } from '@/components/new-organization-dialog'
import { OrganizationsGrid } from './-components/organizations-grid'

export const Route = createFileRoute(
	'/_app/_no-organization-set/organizations'
)({
	component: Organizations,
})

function Organizations() {
	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Suas Organizações</h1>

			<NewOrganizationDialog
				trigger={<Button className='h-8 w-fit px-2'>Nova organização</Button>}
			/>

			<OrganizationsGrid />
		</div>
	)
}
