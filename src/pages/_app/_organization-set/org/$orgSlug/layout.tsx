import { createFileRoute, Outlet } from '@tanstack/react-router'
import { OrganizationHeader } from './-components/header'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug')({
	component: OrganizationLayout,
})

function OrganizationLayout() {
	return (
		<div>
			<OrganizationHeader />
			<Outlet />
		</div>
	)
}
