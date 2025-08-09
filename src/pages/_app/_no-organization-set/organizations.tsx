import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
	'/_app/_no-organization-set/organizations'
)({
	component: Organizations,
})

function Organizations() {
	return <div>Suas organizações</div>
}
