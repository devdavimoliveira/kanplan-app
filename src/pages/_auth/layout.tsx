import { createFileRoute, Outlet } from '@tanstack/react-router'

import logo from '../../assets/kanplan-logo.svg'

export const Route = createFileRoute('/_auth')({
	component: AuthLayout,
})

function AuthLayout() {
	return (
		<div className='flex h-dvh items-center justify-center'>
			<div className='flex w-full max-w-lg flex-col gap-4 px-4'>
				<div className='flex flex-col items-center'>
					<img src={logo} alt='Kanplan Logo' className='w-[240px]' />
					<p className='text-sm text-zinc-500'>
						Planejamento visual para equipes ágeis.
					</p>
				</div>

				<Outlet />
			</div>
		</div>
	)
}
