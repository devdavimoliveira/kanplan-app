import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { organization } from '@/lib/auth/auth-client'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import { OrganizationDangerZone } from './-components/organization-danger-zone'
import { OrganizationDetailsForm } from './-components/organization-details-form'

export const Route = createFileRoute(
	'/_app/_organization-set/org/$orgSlug/settings/'
)({
	beforeLoad: async ({ params }) => {
		const { data, error } = await organization.hasPermission({
			permission: {
				organization: ['update', 'delete'],
			},
		})

		if (error || data?.success === false) {
			if (error?.code) {
				toast.error(getAuthErrorMessage(error.code))
			}

			throw redirect({
				to: '/org/$orgSlug',
				params: { orgSlug: params.orgSlug },
				replace: true,
			})
		}
	},
	loader: async ({ params }) => {
		const { data: activeOrganization, error: activeOrganizationError } =
			await organization.getFullOrganization({
				query: { organizationSlug: params.orgSlug, membersLimit: 0 },
			})

		if (activeOrganizationError) {
			toast.error(getAuthErrorMessage(activeOrganizationError.code!))
			throw redirect({ to: '/organizations' })
		}

		return {
			activeOrganization,
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
