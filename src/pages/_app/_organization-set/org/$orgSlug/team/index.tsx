import { createFileRoute } from '@tanstack/react-router'
import { useDeferredValue, useState } from 'react'
import { MembersTable } from './-components/members-table'
import { TableToolbar } from './-components/table-toolbar'

export const Route = createFileRoute(
	'/_app/_organization-set/org/$orgSlug/team/'
)({
	component: OrganizationTeam,
})

function OrganizationTeam() {
	const [filter, setFilter] = useState('')
	const deferredFilter = useDeferredValue(filter)

	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Equipe</h1>

			<div>
				<TableToolbar filter={filter} onFilterChange={setFilter} />
				<div className='overflow-y-auto rounded-lg shadow-card'>
					<MembersTable filter={deferredFilter} />
				</div>
			</div>
		</div>
	)
}
