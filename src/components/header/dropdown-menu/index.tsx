import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate, useRouteContext } from '@tanstack/react-router'
import { CircleUserRound, LayoutDashboard, LogOut } from 'lucide-react'
import kanplanSymbol from '@/assets/kanplan-symbol.svg'
import { Avatar } from '@/components/avatar'
import { signOut } from '@/lib/auth/auth-client'
import { DropdownMenuItem } from './item'
import { useQueryClient } from '@tanstack/react-query'

export function DropdownMenu() {
	const navigate = useNavigate()

	const { session } = useRouteContext({ from: '__root__' })

	const queryClient = useQueryClient()

	async function handleSignOut() {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					queryClient.clear()
					navigate({ to: '/sign-in', replace: true })
				},
			},
		})
	}

	return (
		<DropdownPrimitive.Root>
			<DropdownPrimitive.Trigger
				asChild
				className='hidden cursor-pointer outline-none disabled:pointer-events-none lg:inline-flex'
			>
				<button type='button'>
					<Avatar
						src={session?.user?.image ?? ''}
						alt={session?.user.name ?? ''}
						fallback={session?.user.name.slice(0, 2) ?? ''}
					/>
				</button>
			</DropdownPrimitive.Trigger>

			<DropdownPrimitive.Portal>
				<DropdownPrimitive.Content
					align='end'
					sideOffset={10}
					className='flex w-60 flex-col gap-2 rounded-lg bg-zinc-900 p-2 text-zinc-500 shadow-md shadow-zinc-900/50'
				>
					<div className='px-2 text-sm'>
						<p className='font-medium text-zinc-50'>
							Olá, {session?.user.name}
						</p>
						<p className='truncate'>{session?.user.email}</p>
					</div>

					<div>
						<DropdownMenuItem asChild>
							<Link to={'/'}>
								<span>Projetos</span>
								<LayoutDashboard className='ml-auto size-4.5' />
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem asChild>
							<Link to={'/'}>
								<span>Conta</span>
								<CircleUserRound className='ml-auto size-4.5' />
							</Link>
						</DropdownMenuItem>
					</div>

					<DropdownPrimitive.Separator className='h-px bg-zinc-500' />

					<div>
						<DropdownMenuItem asChild>
							<Link to={'/'}>
								<span>Página Inicial</span>
								<img
									src={kanplanSymbol}
									alt='Kanplan'
									className='ml-auto size-4.5'
								/>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem asChild>
							<button type='button' onClick={handleSignOut}>
								<span>Sair</span>
								<LogOut className='ml-auto size-4.5' />
							</button>
						</DropdownMenuItem>
					</div>
				</DropdownPrimitive.Content>
			</DropdownPrimitive.Portal>
		</DropdownPrimitive.Root>
	)
}
