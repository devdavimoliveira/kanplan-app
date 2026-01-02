import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { InviteMemberDialog } from './invite-member-dialog'
import { Can } from '@/contexts/ability-context'

export function TableToolbar() {
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
			<Input type='text' placeholder='Filtrar membros' />
		</div>
	)
}
