import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { cn } from '../../utils/cn'

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

const signInSchema = z.object({
	email: z.email('Insira um e-mail válido.'),
	password: z.string().nonempty('Insira uma senha.'),
})

type SignInFormType = z.infer<typeof signInSchema>

function SignIn() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormType>({
		resolver: zodResolver(signInSchema),
	})

	const isInvalidEmail = !!errors.email
	const isInvalidPassword = !!errors.password

	function handleSignIn(data: SignInFormType) {
		console.log(data)
	}

	return (
		<div className='flex flex-col gap-4'>
			<form
				onSubmit={handleSubmit(handleSignIn)}
				className='flex flex-col gap-4'
			>
				<div className='flex flex-col gap-2'>
					<Input
						type='email'
						placeholder='E-mail'
						className={cn(isInvalidEmail && 'outline-2 outline-red-500')}
						{...register('email')}
					/>
					{errors.email && (
						<span className='ml-2 text-red-500'>{errors.email.message}</span>
					)}
				</div>
				<div className='flex flex-col gap-2'>
					<Input
						type='password'
						placeholder='Senha'
						className={cn(isInvalidPassword && 'outline-2 outline-red-500')}
						{...register('password')}
					/>
					{errors.password && (
						<span className='ml-2 text-red-500'>{errors.password.message}</span>
					)}
				</div>
				<Button type='submit' disabled={isSubmitting}>
					Entrar
				</Button>
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
