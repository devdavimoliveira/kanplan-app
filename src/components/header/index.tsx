import { Link, useMatchRoute } from '@tanstack/react-router'
import { Building, Slash } from 'lucide-react'
import kanplanSymbol from '@/assets/kanplan-symbol.svg'
import { useActiveOrganization } from '@/lib/auth-client'
import { DropdownMenu } from './dropdown-menu'
import { DropdownOrganizations } from './dropdown-organizations'

export function Header() {
	const { data: activeOrganization, isPending } = useActiveOrganization()

	const matchRoute = useMatchRoute()
	const matchOrganizationRoute = matchRoute({
		to: '/organizations',
		fuzzy: true,
	})

	return (
		<header className='flex h-14 items-center justify-between gap-6'>
			<div className='flex max-w-96 items-center gap-2 overflow-hidden'>
				<div className='xs:flex hidden shrink-0 items-center gap-2'>
					<Link to='/'>
						<img src={kanplanSymbol} alt='Kanplan' className='size-8' />
					</Link>
					<Slash className='-rotate-10 size-3.5 text-zinc-500' />
				</div>

				{matchOrganizationRoute ? (
					<span className='text-sm'>Organizações</span>
				) : isPending ? (
					<div className='h-5 w-32 animate-pulse rounded-lg bg-zinc-800' />
				) : (
					<Link to='/' className='overflow-hidden'>
						<div className='flex items-center gap-1'>
							<Building className='size-4.5 shrink-0 text-zinc-500' />
							<p className='truncate font-medium text-sm'>
								{activeOrganization?.name}
							</p>
						</div>
					</Link>
				)}

				{!matchOrganizationRoute && <DropdownOrganizations />}
			</div>

			<DropdownMenu />
		</header>
	)
}
