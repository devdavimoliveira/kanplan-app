import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { getUserPermissions } from '@/lib/casl/permissions'
import type { Role } from '@/types/Role'
import { OrganizationDangerZone } from './-components/organization-danger-zone'
import { OrganizationDetailsForm } from './-components/organization-details-form'

export const Route = createFileRoute(
	'/_app/_organization-set/org/$orgSlug/settings/'
)({
	beforeLoad: async ({ params, context: { activeMember } }) => {
		const { cannot } = getUserPermissions({
			id: activeMember.userId,
			role: activeMember.role as Role,
		})

		if (cannot('update', 'Organization')) {
			toast.error('Você não tem permissão para configurar a organização')

			throw redirect({
				to: '/org/$orgSlug',
				params: { orgSlug: params.orgSlug },
				replace: true,
			})
		}
	},
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
