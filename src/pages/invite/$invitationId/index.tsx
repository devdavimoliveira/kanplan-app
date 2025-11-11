import { createFileRoute, Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/button'
import {
	authClient,
	getSession,
	organization,
	signOut,
} from '@/lib/auth/auth-client'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import logo from '../../../assets/kanplan-logo.svg'

const searchSchema = z.object({
	slug: z.string(),
})

export const Route = createFileRoute('/invite/$invitationId/')({
	validateSearch: search => searchSchema.parse(search),
	beforeLoad: async ctx => {
		const { data: session } = await getSession()

		const invitation = await authClient.organization.getInvitation({
			query: {
				id: ctx.params.invitationId,
			},
		})

		return { session, invitation }
	},
	component: Invite,
})

function Invite() {
	const navigate = Route.useNavigate()
	const { invitationId } = Route.useParams()
	const { slug } = Route.useSearch()
	const { session, invitation } = Route.useRouteContext()

	const isInvitationForMe = invitation.data?.email === session?.user.email

	function handleSignOut() {
		signOut({
			fetchOptions: {
				onSuccess() {
					navigate({
						to: '/invite/$invitationId',
						params: { invitationId },
						search: { slug },
					})
				},
			},
		})
	}

	async function handleDeclineInvitation() {
		await organization.rejectInvitation({
			invitationId,
			fetchOptions: {
				onError({ error }) {
					toast.error(getAuthErrorMessage(error.code))
				},
				onSuccess() {
					toast.success('Convite rejeitado com sucesso')

					navigate({ to: '/organizations', replace: true })
				},
			},
		})
	}

	async function handleAcceptInvitation() {
		await organization.acceptInvitation({
			invitationId,
			fetchOptions: {
				onError({ error }) {
					toast.error(getAuthErrorMessage(error.code))
				},
				onSuccess() {
					navigate({
						to: '/org/$orgSlug',
						params: { orgSlug: slug },
						replace: true,
					})
				},
			},
		})
	}

	return (
		<div className='flex h-dvh items-center justify-center'>
			<div className='flex w-full max-w-lg flex-col gap-4 px-4'>
				<img src={logo} alt='Kanplan Logo' className='mx-auto w-[240px]' />

				<div className='flex flex-col gap-4 rounded-lg bg-zinc-900 p-4 shadow-card'>
					{!session ? (
						<>
							<p className='text-center font-medium text-sm'>
								Entre ou crie uma conta para aceitar o convite.
							</p>
							<div className='flex items-center justify-center gap-4'>
								<Button variant='default' asChild className='px-2'>
									<Link
										to='/sign-in'
										search={{
											redirectTo: '/invite/$invitationId',
											params: invitationId,
										}}
									>
										Entrar
									</Link>
								</Button>
								<Button variant='default' asChild className='px-2'>
									<Link
										to='/sign-up'
										search={{
											redirectTo: '/invite/$invitationId',
											params: invitationId,
										}}
									>
										Criar conta
									</Link>
								</Button>
							</div>
						</>
					) : isInvitationForMe ? (
						<>
							<p className='text-center font-medium text-sm'>
								Você foi convidado para participar da organização.
							</p>
							<p className='text-center font-medium text-sm'>
								{invitation.data?.organizationName}
							</p>
							<div className='flex items-center justify-center gap-4'>
								<Button
									variant='default'
									className='px-2'
									onClick={handleDeclineInvitation}
								>
									Recusar
								</Button>
								<Button
									variant='default'
									className='px-2'
									onClick={handleAcceptInvitation}
								>
									Aceitar convite
								</Button>
							</div>
						</>
					) : (
						<>
							<p className='text-center font-medium text-sm'>
								{`Seu endereço de e-mail ${session.user.email} não
								corresponde ao endereço de e-mail para o qual este convite foi
								enviado.`}
							</p>
							<p className='text-center font-medium text-sm text-zinc-500'>
								Para aceitar este convite, você precisará{' '}
								<Button
									variant='link'
									className='h-auto'
									onClick={handleSignOut}
								>
									sair
								</Button>{' '}
								e depois entrar ou criar uma nova conta usando o mesmo endereço
								de e-mail usado no convite.
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
