import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSession } from '@/lib/auth/auth-client'
import Divider from './-components/divider'
import { SocialLogin } from './-components/social-login'
import Welcome from './-components/welcome'

export const Route = createFileRoute('/_auth')({
	beforeLoad: async () => {
		const { data } = await getSession()

		if (data?.user) throw redirect({ to: '/', replace: true })
	},
	component: AuthLayout,
})

function AuthLayout() {
	return (
		<div className='flex h-dvh items-center justify-center'>
			<div className='flex w-full max-w-lg flex-col gap-4 px-4'>
				<Welcome />

				<SocialLogin />

				<Divider />

				<Outlet />
			</div>
		</div>
	)
}
