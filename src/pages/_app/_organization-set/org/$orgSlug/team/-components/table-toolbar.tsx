import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Can } from '@/contexts/ability-context'
import { InviteMemberDialog } from './invite-member-dialog'

interface TableToolbarProps {
	filter: string
	onFilterChange: (filter: string) => void
}

export function TableToolbar({ filter, onFilterChange }: TableToolbarProps) {
	return (
		<div className='mb-4 flex xs:flex-row flex-col xs:justify-between gap-4'>
			<Can I='create' a='Invitation'>
				<InviteMemberDialog
					trigger={
						<Button type='button' className='xs:order-2 xs:px-2'>
							Convidar membro
						</Button>
					}
				/>
			</Can>
			<Input
				type='text'
				placeholder='Filtrar membros'
				value={filter}
				onChange={e => onFilterChange(e.target.value)}
			/>
		</div>
	)
}
