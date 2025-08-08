import { Link } from '@tanstack/react-router'
import { Building, ChevronsUpDown, Slash } from 'lucide-react'
import kanplanSymbol from '@/assets/kanplan-symbol.svg'
import { DropdownMenu } from './dropdown-menu'

export function Header() {
	return (
		<header className='flex h-14 items-center justify-between gap-6'>
			<div className='flex max-w-96 items-center gap-2 overflow-hidden'>
				<div className='xs:flex hidden shrink-0 items-center gap-2'>
					<Link to='/'>
						<img src={kanplanSymbol} alt='Kanplan' className='size-8' />
					</Link>
					<Slash className='-rotate-10 size-3.5 text-zinc-500' />
				</div>

				<Link to='/' className='overflow-hidden'>
					<div className='flex items-center gap-1'>
						<Building className='size-4.5 shrink-0 text-zinc-500' />
						<p className='truncate font-medium text-sm'>Projetos Pessoais</p>
					</div>
				</Link>

				<button type='button' className='cursor-pointer'>
					<ChevronsUpDown className='size-4.5 text-zinc-500' />
				</button>
			</div>

			<DropdownMenu />
		</header>
	)
}
