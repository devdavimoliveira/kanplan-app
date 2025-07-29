import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../../components/button'
import { Input } from '../../components/input'

export const Route = createFileRoute('/_auth/sign-in')({
	component: SignIn,
	head: () => ({
		meta: [
			{
				title: 'Login | Kanplan',
			},
		],
	}),
})

function SignIn() {
	return (
		<div className='flex flex-col gap-4'>
			<form className='flex flex-col gap-4'>
				<Input type='email' placeholder='E-mail' />
				<Input type='password' placeholder='Senha' />
				<Button type='submit'>Entrar</Button>
			</form>
			<span className='self-center text-sm text-zinc-500'>
				Não tem uma conta?{' '}
				<Link to='/sign-up' className='text-cyan-500 hover:underline'>
					Inscreva-se
				</Link>
			</span>
		</div>
	)
}
