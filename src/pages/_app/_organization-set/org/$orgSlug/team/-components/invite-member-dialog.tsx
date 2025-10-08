import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { type ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { organization, useActiveOrganization } from '@/lib/auth-client'
import { RoleEnum } from '@/types/Role'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import { translateRoleToPtBR } from '@/utils/translate-role-to-pt-br'

interface InviteMemberDialogProps {
	trigger: ReactNode
}

const inviteMemberSchema = z.object({
	email: z.email('Insira um e-mail válido'),
	role: z.enum(Object.values(RoleEnum)),
})

type InviteMemberFormType = z.infer<typeof inviteMemberSchema>

export function InviteMemberDialog({ trigger }: InviteMemberDialogProps) {
	const [open, setOpen] = useState(false)

	const roles = Object.values(RoleEnum)

	const { data: activeOrganization } = useActiveOrganization()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(inviteMemberSchema),
	})

	async function handleInviteMember(data: InviteMemberFormType) {
		await organization.inviteMember({
			organizationId: activeOrganization?.id,
			email: data.email,
			role: data.role,
			resend: true,
			fetchOptions: {
				onError({ error }) {
					toast.error(getAuthErrorMessage(error.code))
				},
				onSuccess: () => {
					toast.success('Convite enviado com sucesso')
					setOpen(false)
				},
			},
		})

		reset()
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-[90vw] max-w-lg transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>
						Convidar novo membro
					</Dialog.Title>

					<div className='h-px bg-zinc-500' />

					<Dialog.Description className='p-4 text-sm text-zinc-500'>
						Envie um convite para o email do usuário que deseja convidar para
						organização.
					</Dialog.Description>

					<form
						onSubmit={handleSubmit(handleInviteMember)}
						className='flex flex-col gap-4 p-4'
					>
						<Select
							id='select-role'
							defaultValue={RoleEnum.MEMBER}
							{...register('role')}
						>
							{roles.map(role => (
								<option key={role} value={role} className='bg-zinc-900'>
									{translateRoleToPtBR(role)}
								</option>
							))}
						</Select>

						<div className='flex flex-col gap-2'>
							<Input
								type='email'
								placeholder='Email do membro'
								{...register('email')}
							/>
							{errors?.email && (
								<span className='ml-2 text-red-500'>
									{errors.email.message}
								</span>
							)}
						</div>

						<Button type='submit' disabled={isSubmitting}>
							Enviar convite
						</Button>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
