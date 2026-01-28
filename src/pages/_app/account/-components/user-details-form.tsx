import { zodResolver } from '@hookform/resolvers/zod'
import { useRouteContext } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'

const userDetailsSchema = z.object({
	name: z.string().nonempty('Insira um nome'),
	email: z.email().nonempty('Insira um email'),
})

type UserDetailsFormType = z.infer<typeof userDetailsSchema>

export function UserDetailsForm() {
	const { session } = useRouteContext({ from: '__root__' })

	const user = session!.user

	const {
		register,
		handleSubmit,
		formState: { isDirty },
		reset,
	} = useForm({
		resolver: zodResolver(userDetailsSchema),
		values: {
			name: user.name,
			email: user.email,
		},
	})

	function handleCancel() {
		reset()
	}

	async function handleSave(formData: UserDetailsFormType) {
		console.log(formData)
	}

	return (
		<form
			onSubmit={handleSubmit(handleSave)}
			className='flex flex-col gap-4 rounded-lg bg-zinc-900 py-4 shadow-card'
		>
			<div className='flex xs:flex-row flex-col xs:justify-between gap-2 px-2'>
				<label htmlFor='name' className='ml-2 text-sm'>
					Nome
				</label>
				<Input id='name' type='text' {...register('name')} />
			</div>

			<div className='h-px w-full bg-zinc-800' />

			<div className='flex xs:flex-row flex-col xs:justify-between gap-2 px-2'>
				<label htmlFor='email' className='ml-2 text-sm'>
					E-mail
				</label>
				<Input id='email' type='text' {...register('email')} />
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
