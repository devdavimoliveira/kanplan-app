import { useRouteContext } from '@tanstack/react-router'
import { useFormContext } from 'react-hook-form'
import { Select } from '@/components/select'
import type { EditCardFormType } from './edit-card-dialog'

export function AssignedUserSelect() {
	const { activeOrganization } = useRouteContext({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	const { register } = useFormContext<EditCardFormType>()

	return (
		<Select
			id='select-assigned-user'
			className='h-7 w-40 outline-none'
			{...register('assignedBy')}
		>
			<option value=''>Ninguém</option>
			{activeOrganization?.members.map(member => (
				<option
					key={member.userId}
					value={member.userId}
					className='bg-zinc-900'
				>
					{member.user.name}
				</option>
			))}
		</Select>
	)
}
