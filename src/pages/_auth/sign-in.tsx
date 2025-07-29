import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../../components/button'
import { Input } from '../../components/input'

export const Route = createFileRoute('/_auth/sign-in')({
	component: SignIn,
	head: () => ({
		meta: [
			{
				title: 'Sign-in | Kanplan',
			},
		],
	}),
})

function SignIn() {
	return (
		<form className='flex flex-col gap-4'>
			<Input type='email' placeholder='E-mail' />
			<Input type='password' placeholder='Senha' />
			<Button type='submit'>Entrar</Button>
		</form>
	)
}
