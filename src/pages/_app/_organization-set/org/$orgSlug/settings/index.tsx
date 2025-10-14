import { createFileRoute } from '@tanstack/react-router'
import { OrganizationDangerZone } from './-components/organization-danger-zone'
import { OrganizationDetailsForm } from './-components/organization-details-form'

export const Route = createFileRoute(
	'/_app/_organization-set/org/$orgSlug/settings/'
)({
	component: OrganizationSettings,
})

function OrganizationSettings() {
	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Configurações</h1>

			<OrganizationDetailsForm />
			<OrganizationDangerZone />
		</div>
	)
}
