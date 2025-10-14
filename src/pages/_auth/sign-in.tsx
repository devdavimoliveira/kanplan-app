import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { PasswordInput } from '@/components/password-input'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/utils/cn'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'

const searchSchema = z.object({
	redirectTo: z.string().optional(),
	params: z.string().optional(),
})

export const Route = createFileRoute('/_auth/sign-in')({
	component: SignIn,
	head: () => ({
		meta: [
			{
				title: 'Login | Kanplan',
			},
		],
	}),
	validateSearch: search => searchSchema.parse(search),
})

const signInSchema = z.object({
	email: z.email('Insira um e-mail válido'),
	password: z.string().nonempty('Insira uma senha'),
})

type SignInFormType = z.infer<typeof signInSchema>

function SignIn() {
	const navigate = Route.useNavigate()

	const searchParams = Route.useSearch()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormType>({
		resolver: zodResolver(signInSchema),
	})

	const isInvalidEmail = !!errors.email
	const isInvalidPassword = !!errors.password

	async function handleSignIn(data: SignInFormType) {
		const { email, password } = data

		await authClient.signIn.email({
			email,
			password,
			fetchOptions: {
				onError(ctx) {
					toast.error(getAuthErrorMessage(ctx.error.code))
				},
				onSuccess: () => {
					if (searchParams?.redirectTo?.includes('invite')) {
						return navigate({
							to: searchParams.redirectTo,
							params: { invitationId: searchParams.params },
							replace: true,
						})
					}

					navigate({ to: '/organizations', replace: true })
				}, // TODO: redirect to the org page
			},
		})
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
					<PasswordInput
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
				<Button variant='link' asChild>
					<Link to='/sign-up'>Inscreva-se</Link>
				</Button>
			</span>
		</div>
	)
}
