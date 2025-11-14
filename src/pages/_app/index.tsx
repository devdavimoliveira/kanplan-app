import { createFileRoute, Navigate, redirect } from '@tanstack/react-router'
import { activeOrganizationQueryOptions } from '@/queries/organization-queries'

export const Route = createFileRoute('/_app/')({
	beforeLoad: async ({ context: { queryClient } }) => {
		const { data: activeOrganization } = await queryClient.fetchQuery(
			activeOrganizationQueryOptions()
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
