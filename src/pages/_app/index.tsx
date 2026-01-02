import { createFileRoute, Navigate, redirect } from '@tanstack/react-router'
import { organization } from '@/lib/auth/auth-client'

export const Route = createFileRoute('/_app/')({
	beforeLoad: async () => {
		const { data: activeOrganization } = await organization.getFullOrganization(
			{ query: { membersLimit: 0 } }
		)

		if (!activeOrganization)
			throw redirect({ to: '/organizations', replace: true })

		return {
			activeOrganization,
		}
	},
	component: App,
})

function App() {
	const { activeOrganization } = Route.useRouteContext()

	return Navigate({
		to: '/org/$orgSlug',
		params: { orgSlug: activeOrganization.slug },
		replace: true,
	})
}
