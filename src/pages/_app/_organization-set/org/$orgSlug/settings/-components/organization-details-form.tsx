import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { organization, useActiveOrganization } from '@/lib/auth/auth-client'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'

const organizationDetailsSchema = z.object({
	name: z.string().nonempty('Insira um nome'),
	slug: z.string().nonempty('Insira um slug'),
})

type OrganizationDetailsFormType = z.infer<typeof organizationDetailsSchema>

export function OrganizationDetailsForm() {
	const { data: activeOrganization, refetch } = useActiveOrganization()

	const {
		register,
		handleSubmit,
		formState: { isDirty },
		reset,
	} = useForm({
		resolver: zodResolver(organizationDetailsSchema),
		values: {
			name: activeOrganization?.name ?? '',
			slug: activeOrganization?.slug ?? '',
		},
	})

	function handleCancel() {
		reset()
	}

	async function handleSave(formData: OrganizationDetailsFormType) {
		await organization.update({
			data: {
				...formData,
			},
			organizationId: activeOrganization?.id,
			fetchOptions: {
				onError({ error }) {
					toast.error(getAuthErrorMessage(error.code))
				},
				onSuccess() {
					toast.success('Organização atualizada com sucesso')
					refetch()
				},
			},
		})
	}

	return (
		<form
			onSubmit={handleSubmit(handleSave)}
			className='flex flex-col gap-4 rounded-lg bg-zinc-900 py-4 shadow-card'
		>
			<div className='flex xs:flex-row flex-col xs:justify-between gap-2 px-2'>
				<label htmlFor='organization-name' className='ml-2 text-sm'>
					Nome da organização
				</label>
				<Input id='organization-name' type='text' {...register('name')} />
			</div>

			<div className='h-px w-full bg-zinc-800' />

			<div className='flex xs:flex-row flex-col xs:justify-between gap-2 px-2'>
				<label htmlFor='organization-slug' className='ml-2 text-sm'>
					Slug da organização
				</label>
				<Input
					id='organization-slug'
					type='text'
					disabled
					{...register('slug')}
				/>
			</div>

			<div className='h-px w-full bg-zinc-800' />

			<div className='flex justify-end gap-2 px-2'>
				<Button
					type='button'
					className='px-2'
					disabled={!isDirty}
					onClick={handleCancel}
				>
					Cancelar
				</Button>
				<Button type='submit' className='px-2' disabled={!isDirty}>
					Salvar
				</Button>
			</div>
		</form>
	)
}
