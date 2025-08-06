import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from './-components/header'

export const Route = createFileRoute('/_app')({
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
