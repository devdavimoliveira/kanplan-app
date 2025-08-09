import { createFileRoute, redirect } from '@tanstack/react-router'
import { organization } from '@/lib/auth-client'

export const Route = createFileRoute('/_app/_organization-set/')({
	beforeLoad: async () => {
		const { data } = await organization.getFullOrganization()

		if (!data) throw redirect({ to: '/organizations' })
	},
	component: App,
})

function App() {
	return <div>App Index Page</div>
}
