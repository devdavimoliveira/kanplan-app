import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/button'

export function OrganizationDangerZone() {
	return (
		<div className='flex flex-col gap-4 rounded-lg bg-zinc-900 p-4 shadow-card'>
			<h3 className='flex items-center gap-2 font-medium text-xl'>
				<TriangleAlert className='size-7 text-red-500' />
				Deletar organização
			</h3>
			<p className='text-justify text-sm'>
				Remove permanentemente toda sua equipe e projetos da plataforma do
				Kanplan. Esta ação não pode ser desfeita - continue com cautela.
			</p>
			<Button className='self-start px-2' variant='warning'>
				Deletar organização
			</Button>
		</div>
	)
}
