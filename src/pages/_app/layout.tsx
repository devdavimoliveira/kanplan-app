import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Header } from '@/components/header'

export const Route = createFileRoute('/_app')({
	beforeLoad: async ({ context: { session } }) => {
		if (!session) throw redirect({ to: '/sign-in', replace: true })
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
