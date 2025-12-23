import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { OrganizationHeader } from './-components/header'
import {
	activeMemberQueryOptions,
	organizationBySlugQueryOptions,
} from '@/queries/organization-queries'
import { toast } from 'sonner'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import { organization } from '@/lib/auth/auth-client'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug')({
	beforeLoad: async ({ params, context: { queryClient } }) => {
		const { data: activeOrganization, error: activeOrganizationError } =
			await queryClient.ensureQueryData(
				organizationBySlugQueryOptions({
					organizationSlug: params.orgSlug,
				})
			)

		if (activeOrganizationError) {
			toast.error(getAuthErrorMessage(activeOrganizationError.code!))
			throw redirect({ to: '/organizations' })
		}

		await organization.setActive({
			organizationId: activeOrganization.id,
		})

		const { data: activeMember, error: activeMemberError } =
			await queryClient.ensureQueryData(activeMemberQueryOptions())

		if (activeMemberError) {
			toast.error(getAuthErrorMessage(activeMemberError.code!))
			throw redirect({ to: '/organizations' })
		}

		return {
			activeOrganization,
			activeMember,
		}
	},
	component: OrganizationLayout,
})

function OrganizationLayout() {
	return (
		<div>
			<OrganizationHeader />
			<Outlet />
		</div>
	)
}
