import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { OrganizationHeader } from './-components/header'
import { toast } from 'sonner'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import { organization } from '@/lib/auth/auth-client'
import { AbilityProvider } from '@/contexts/ability-context'
import type { AuthUser } from '@/lib/casl/schemas/auth-user'
import type { Role } from '@/types/Role'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug')({
	beforeLoad: async ({ params }) => {
		const { data: activeOrganization, error: activeOrganizationError } =
			await organization.setActive({
				organizationSlug: params.orgSlug,
			})

		if (activeOrganizationError) {
			toast.error(getAuthErrorMessage(activeOrganizationError.code!))
			throw redirect({ to: '/organizations' })
		}

		const { data: activeMember, error: activeMemberError } =
			await organization.getActiveMember()

		if (activeMemberError) {
			toast.error(getAuthErrorMessage(activeMemberError.code!))
			throw redirect({ to: '/organizations' })
		}

		const authUser: AuthUser = {
			id: activeMember.userId,
			role: activeMember.role as Role,
		}

		return {
			activeOrganization,
			activeMember,
			authUser,
		}
	},
	component: OrganizationLayout,
})

function OrganizationLayout() {
	const { authUser } = Route.useRouteContext()

	return (
		<AbilityProvider authUser={authUser}>
			<div>
				<OrganizationHeader />
				<Outlet />
			</div>
		</AbilityProvider>
	)
}
