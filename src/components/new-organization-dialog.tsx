import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useNavigate } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { organization } from '@/lib/auth/auth-client'
import { generateSlug } from '@/utils/generate-slug'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import { Button } from './button'
import { Input } from './input'

const newOrganizationSchema = z.object({
	name: z.string().nonempty('Insira um nome'),
})

type NewOrganizationFormType = z.infer<typeof newOrganizationSchema>

interface NewOrganizationDialogProps {
	trigger: ReactNode
	onSuccess?: () => void
}

export function NewOrganizationDialog({
	trigger,
	onSuccess,
}: NewOrganizationDialogProps) {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(newOrganizationSchema),
	})

	async function handleNewOrganization({ name }: NewOrganizationFormType) {
		const orgSlug = generateSlug()

		await organization.create({
			name,
			slug: orgSlug,
			fetchOptions: {
				onError({ error }) {
					toast.error(getAuthErrorMessage(error.code))
				},
				onSuccess: () => {
					navigate({ to: '/org/$orgSlug', params: { orgSlug } })
					onSuccess?.()
				},
			},
		})
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>
						Criar uma nova organização
					</Dialog.Title>

					<div className='h-px bg-zinc-500' />

					<Dialog.Description className='p-4 text-sm text-zinc-500'>
						Essa é sua organização dentro do Kanplan. Use-a para gerir seus
						projetos e membros.
					</Dialog.Description>

					<form
						onSubmit={handleSubmit(handleNewOrganization)}
						className='flex flex-col gap-4 p-4'
					>
						<div className='flex flex-col gap-1'>
							<Input placeholder='Nome da organização' {...register('name')} />
							{errors.name && (
								<span className='ml-2 text-red-500'>{errors.name.message}</span>
							)}
						</div>
						<Button type='submit' disabled={isSubmitting}>
							Criar organização
						</Button>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
