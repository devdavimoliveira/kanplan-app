import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { signUp } from '@/lib/auth-client'
import { cn } from '@/utils/cn'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
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

const signUpSchema = z.object({
	name: z.string().nonempty('Insira um nome'),
	email: z.email('Insira um e-mail válido'),
	password: z.string().nonempty('Insira uma senha'),
})

type SignUpFormType = z.infer<typeof signUpSchema>

function SignUp() {
	const navigate = Route.useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormType>({
		resolver: zodResolver(signUpSchema),
	})

	const isInvalidName = !!errors.name
	const isInvalidEmail = !!errors.email
	const isInvalidPassword = !!errors.password

	async function handleSignUp({ name, email, password }: SignUpFormType) {
		await signUp.email({
			name,
			email,
			password,
			fetchOptions: {
				onError(ctx) {
					toast.error(getAuthErrorMessage(ctx.error.code))
				},
				onSuccess: () => navigate({ to: '/', replace: true }),
			},
		})
	}

	return (
		<div className='flex flex-col gap-4'>
			<form
				className='flex flex-col gap-4'
				onSubmit={handleSubmit(handleSignUp)}
			>
				<div className='flex flex-col gap-1'>
					<Input
						type='text'
						placeholder='Nome completo'
						className={cn(isInvalidName && 'outline-2 outline-red-500')}
						{...register('name')}
					/>
					{errors.name && (
						<span className='ml-2 text-red-500'>{errors.name.message}</span>
					)}
				</div>
				<div className='flex flex-col gap-1'>
					<Input
						type='email'
						placeholder='E-mail'
						{...register('email')}
						className={cn(isInvalidEmail && 'outline-2 outline-red-500')}
					/>
					{errors.email && (
						<span className='ml-2 text-red-500'>{errors.email.message}</span>
					)}
				</div>
				<div className='flex flex-col gap-1'>
					<PasswordInput
						placeholder='Senha'
						{...register('password')}
						className={cn(isInvalidPassword && 'outline-2 outline-red-500')}
					/>
					{errors.password && (
						<span className='ml-2 text-red-500'>{errors.password.message}</span>
					)}
				</div>
				<Button
					type='submit'
					disabled={isSubmitting}
					className='disabled:pointer-events-auto disabled:cursor-wait'
				>
					Criar conta
				</Button>
			</form>
			<span className='self-center text-sm text-zinc-500'>
				Já tem uma conta?{' '}
				<Button variant='link' asChild>
					<Link to='/sign-in'>Entre</Link>
				</Button>
			</span>
		</div>
	)
}
