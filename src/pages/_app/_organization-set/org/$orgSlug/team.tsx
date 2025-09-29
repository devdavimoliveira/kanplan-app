import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
	'/_app/_organization-set/org/$orgSlug/team'
)({
	component: OrganizationTeam,
})

function OrganizationTeam() {
	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Equipe</h1>
		</div>
	)
}
