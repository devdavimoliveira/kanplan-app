import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/button'
import { ColorPicker } from '@/components/color-picker'
import { Input } from '@/components/input'
import { queryClient } from '@/lib/query-client'
import { createBoardMutationOptions } from '@/mutations/boards-mutations'
import type { Organization } from '@/types/Organization'
import { cn } from '@/utils/cn'

const DEFAULT_COLOR = '#0092B8'

const newBoardSchema = z.object({
	name: z.string().nonempty('Insira um nome'),
	highlightColor: z.string().default(DEFAULT_COLOR),
	organizationId: z.string(),
})

type NewBoardFormType = z.infer<typeof newBoardSchema>

interface NewBoardDialogProps {
	trigger: ReactNode
	organization: Organization
}

export function NewBoardDialog({ trigger, organization }: NewBoardDialogProps) {
	const [open, setOpen] = useState(false)

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(newBoardSchema),
		defaultValues: {
			name: '',
			highlightColor: DEFAULT_COLOR,
			organizationId: organization.id,
		},
	})

	const { mutate, isPending } = useMutation(
		createBoardMutationOptions({
			onSuccess: () => {
				reset()

				queryClient.invalidateQueries({ queryKey: ['boards', organization.id] })

				setOpen(false)
			},
			onError: () => {
				toast.error('Ocorreu um erro ao criar o quadro')
			},
		})
	)

	function handleNewBoard(data: NewBoardFormType) {
		mutate(data)
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-[90vw] max-w-lg transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>
						Criar um novo quadro
					</Dialog.Title>

					<VisuallyHidden>
						<Dialog.Description>
							{`Criar um novo quadro dentro da organização ${organization.name}`}
						</Dialog.Description>
					</VisuallyHidden>

					<div className='h-px bg-zinc-500' />

					<form
						onSubmit={handleSubmit(handleNewBoard)}
						className='flex flex-col gap-4 p-4'
					>
						<div className='flex flex-col gap-1'>
							<Input
								placeholder='Nome do quadro'
								className={cn(!!errors.name && 'outline-2 outline-red-500')}
								{...register('name')}
							/>
							{errors.name && (
								<span className='ml-2 text-red-500'>{errors.name.message}</span>
							)}
						</div>

						<div className='flex items-center gap-2 self-end'>
							<span>Cor de destaque</span>
							<Controller
								name='highlightColor'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ColorPicker color={value} onChange={onChange} align='end' />
								)}
							/>
						</div>

						<Button
							type='submit'
							disabled={isPending}
							className='disabled:pointer-events-auto disabled:cursor-wait'
						>
							Criar quadro
						</Button>
					</form>

					<Dialog.Close asChild>
						<Button
							variant='ghost'
							onClick={() => setOpen(false)}
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
