import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSession } from '@/lib/auth-client'

export const Route = createFileRoute('/_app')({
	beforeLoad: async () => {
		const { data } = await getSession()

		if (!data) throw redirect({ to: '/sign-in', replace: true })
	},
	component: AppLayout,
})

function AppLayout() {
	return <Outlet />
}
