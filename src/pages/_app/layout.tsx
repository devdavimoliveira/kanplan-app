import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSession } from '@/lib/auth-client'
import { Header } from './-components/header'

export const Route = createFileRoute('/_app')({
	beforeLoad: async () => {
		const { data } = await getSession()

		if (!data) throw redirect({ to: '/sign-in', replace: true })
	},
	component: AppLayout,
})

function AppLayout() {
	return (
		<div className='h-dvh px-4'>
			<Header />
			<Outlet />
		</div>
	)
}
