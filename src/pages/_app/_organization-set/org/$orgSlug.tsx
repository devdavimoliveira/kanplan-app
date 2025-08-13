import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { organization } from '@/lib/auth-client'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug')({
	beforeLoad: async ({ params }) => {
		const { data: activeOrganization } = await organization.getFullOrganization(
			{
				query: { organizationSlug: params.orgSlug, membersLimit: 0 },
				fetchOptions: {
					onError: ({ error }) => {
						toast.error(
							`Organização não existe ou ${getAuthErrorMessage(error.code).toLowerCase()}`
						)
						throw redirect({ to: '/organizations' })
					},
				},
			}
		)

		if (activeOrganization) {
			await organization.setActive({
				organizationId: activeOrganization!.id,
			})
		}

		return {
			activeOrganization,
		}
	},
	component: Organization,
})

function Organization() {
	const { activeOrganization } = Route.useRouteContext()

	return <div>{activeOrganization?.name}</div>
}
