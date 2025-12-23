import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useNavigate, useRouteContext } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { organization } from '@/lib/auth/auth-client'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'

const deleteOrganizationSchema = z
	.object({
		organizationSlug: z.string(),
		confirmOrganizationSlug: z.string(),
	})
	.refine(data => data.organizationSlug === data.confirmOrganizationSlug, {
		error: 'Os caracteres digitados não coincidem',
		path: ['confirmOrganizationSlug'],
	})

export function DeleteOrganizationDialog() {
	const navigate = useNavigate()

	const { activeOrganization } = useRouteContext({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm({
		mode: 'onChange',
		resolver: zodResolver(deleteOrganizationSchema),
		defaultValues: {
			organizationSlug: activeOrganization.slug,
		},
	})

	async function handleDeleteOrganization() {
		await organization.delete({
			organizationId: activeOrganization.id,
			fetchOptions: {
				onError({ error }) {
					toast.error(getAuthErrorMessage(error.code))
				},
				onSuccess: () => {
					toast.success('Organização deletada com sucesso')

					navigate({ to: '/organizations', replace: true })
				},
			},
		})
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button className='self-start px-2' variant='warning'>
					Deletar organização
				</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs'></Dialog.Overlay>
				<Dialog.Content className='-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-[90vw] max-w-96 transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='my-4 px-4 font-medium'>
						Deletar organização
					</Dialog.Title>

					<Dialog.Description className='my-4 px-4 text-justify text-sm'>
						Essa ação não poderá ser desfeita. Você removerá permanentemente a
						organização {activeOrganization.name} e todos os seus projetos.
					</Dialog.Description>

					<div className='h-px bg-zinc-500' />

					<form
						onSubmit={handleSubmit(handleDeleteOrganization)}
						className='my-4 flex flex-col gap-4 px-4'
					>
						<p className='text-sm'>
							Por favor, digite{' '}
							<span className='font-medium text-base'>
								{activeOrganization.slug}
							</span>{' '}
							para confirmar.
						</p>

						<Input
							variant='warning'
							placeholder='Digite os caracteres acima'
							{...register('confirmOrganizationSlug')}
						/>

						<Button variant='warning' disabled={!isValid}>
							Eu entendo, deletar a organização
						</Button>
					</form>

					<Dialog.Close asChild>
						<Button
							variant='ghost'
							className='absolute top-2 right-1.5 h-auto p-0.5'
						>
							<X size={24} />
						</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
