import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { createColumnMutationOptions } from '@/mutations/columns-mutations'
import type { BoardWithColumnsAndTasks } from '@/types/Board'

interface NewColumnButtonProps {
	board: BoardWithColumnsAndTasks
}

const newColumnSchema = z.object({
	title: z.string().nonempty('Insira um título'),
	position: z.number().positive(),
	boardId: z.uuid(),
})

type NewColumnFormType = z.infer<typeof newColumnSchema>

export function NewColumnButton({ board }: NewColumnButtonProps) {
	const [open, setOpen] = useState(false)

	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(newColumnSchema),
		values: {
			title: '',
			position: board.columns.length + 1,
			boardId: board.id,
		},
	})

	const { mutate } = useMutation(
		createColumnMutationOptions({
			onMutate: async ({ title, position, boardId }) => {
				await queryClient.cancelQueries({ queryKey: ['board', board.id] })

				const prevBoard = queryClient.getQueryData<BoardWithColumnsAndTasks>([
					'board',
					board.id,
				])

				queryClient.setQueryData(
					['board', board.id],
					(old: BoardWithColumnsAndTasks) =>
						produce(old, draft => {
							draft.columns.push({
								id: Date.now().toString(),
								title,
								position,
								boardId,
								tasks: [],
								createdAt: Date.now().toString(),
							})
						})
				)

				return { prevBoard }
			},
			onError: (_, __, context) => {
				if (context?.prevBoard) {
					queryClient.setQueryData(['board', board.id], context.prevBoard)
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: ['board', board.id] })
			},
		})
	)

	function handleNewColumn(data: NewColumnFormType) {
		mutate(
			{
				title: data.title,
				position: data.position,
				boardId: data.boardId,
			},
			{
				onError: () => {
					toast.error('Ocorreu um erro ao criar a coluna')
				},
				onSuccess: () => {
					reset()
					setOpen(false)
				},
			}
		)
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button type='button' className='px-2'>
					<Plus className='mr-2 size-4.5' />
					Nova coluna
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs'></Dialog.Overlay>
				<Dialog.Content className='fixed top-1/2 left-1/2 w-[90vw] max-w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-zinc-900 shadow-card'>
					<VisuallyHidden>
						<Dialog.Title>Nova coluna</Dialog.Title>
					</VisuallyHidden>
					<Dialog.Description className='my-4 px-4 text-justify'>
						Insira o título da nova coluna
					</Dialog.Description>

					<div className='h-px bg-zinc-500' />

					<form
						onSubmit={handleSubmit(handleNewColumn)}
						className='my-4 flex flex-col gap-4 px-4'
					>
						<div className='flex flex-col gap-2'>
							<Input {...register('title')} />
							{errors?.title && (
								<span className='ml-2 text-red-500'>
									{errors.title.message}
								</span>
							)}
						</div>
						<Button disabled={isSubmitting}>Criar coluna</Button>
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
