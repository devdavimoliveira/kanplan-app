import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { PasswordInput } from '../../components/password-input'

export const Route = createFileRoute('/_auth/sign-up')({
	component: SignUp,
	head: () => ({
		meta: [
			{
				title: 'Inscrever-se | Kanplan',
			},
		],
	}),
})

function SignUp() {
	return (
		<div className='flex flex-col gap-4'>
			<form className='flex flex-col gap-4'>
				<Input type='text' placeholder='Nome completo' />
				<Input type='email' placeholder='E-mail' />
				<PasswordInput placeholder='Senha' />
				<Button type='submit'>Criar conta</Button>
			</form>
			<span className='self-center text-sm text-zinc-500'>
				Já tem uma conta?{' '}
				<Link to='/sign-in' className='text-cyan-500 hover:underline'>
					Entre
				</Link>
			</span>
		</div>
	)
}
