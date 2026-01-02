import { useNavigate, useRouteContext } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Tooltip } from '@/components/tooltip'
import { organization, useActiveOrganization } from '@/lib/auth/auth-client'
import { type Role, roles } from '@/types/Role'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import { translateRoleToPtBR } from '@/utils/translate-role-to-pt-br'

export function MembersTable() {
	const navigate = useNavigate()

	const { data: activeOrganization } = useActiveOrganization()

	const { session } = useRouteContext({ from: '__root__' })

	async function handleLeaveOrganization() {
		if (!activeOrganization) return

		await organization.leave({
			organizationId: activeOrganization.id,
			fetchOptions: {
				onError({ error }) {
					toast.error(getAuthErrorMessage(error.code))
				},
				onSuccess() {
					navigate({
						to: '/organizations',
						replace: true,
						reloadDocument: true,
					})
				},
			},
		})
	}

	return (
		<table className='w-full'>
			<thead>
				<tr>
					<th className='h-10 px-4 text-left'>Usuário</th>
					<th className='h-10 px-4 text-left'>E-mail</th>
					<th className='h-10 px-4 text-left'>Cargo</th>
					<th className='h-10 px-4' />
				</tr>
			</thead>
			<tbody className='bg-zinc-900'>
				{activeOrganization?.members.map(member => (
					<tr key={member.id}>
						<td className='p-4 text-left'>
							<div className='flex items-center gap-2'>
								<Avatar
									src={member.user?.image}
									alt={member.user.name}
									fallback={member.user.name.charAt(0).toUpperCase()}
									className='size-10 shrink-0'
								/>
								<p className='whitespace-nowrap'>{member.user.name}</p>
								{member.userId === session?.user.id && (
									<div className='rounded-full bg-zinc-950 px-2 py-1 text-sm shadow-card'>
										Você
									</div>
								)}
							</div>
						</td>
						<td className='p-4 text-left'>{member.user.email}</td>
						<td className='p-4 text-left'>
							{translateRoleToPtBR(member.role as Role)}
						</td>
						<td className='p-4 text-right'>
							{session?.user.id === member.userId && (
								<Tooltip
									side='bottom'
									content='Você não pode sair da organização pois é o único proprietário'
									disabled={!(member.role === roles['owner'])}
								>
									<Button
										type='button'
										variant='outline'
										className='h-9 px-2'
										disabled={member.role === roles['owner']}
										onClick={handleLeaveOrganization}
									>
										Deixar equipe
									</Button>
								</Tooltip>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
