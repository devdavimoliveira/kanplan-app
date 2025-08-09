import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_no-organization-set')({
	component: NoOrgaziationSetLayout,
})

function NoOrgaziationSetLayout() {
	return (
		<div className='h-dvh px-4'>
			<Outlet />
		</div>
	)
}
