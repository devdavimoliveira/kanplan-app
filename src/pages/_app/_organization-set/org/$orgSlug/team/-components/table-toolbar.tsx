import { Button } from '@/components/button'
import { Input } from '@/components/input'

export function TableToolbar() {
	return (
		<div className='mb-4 flex xs:flex-row flex-col xs:justify-between gap-4'>
			<Button type='button' className='xs:order-2 xs:px-2'>
				Convidar membro
			</Button>
			<Input type='text' placeholder='Filtrar membros' />
		</div>
	)
}
