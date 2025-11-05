import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/button'
import { removeTaskMutationOptions } from '@/mutations/tasks-mutations'

interface RemoveCardDialogProps {
	taskId: string
	children: ReactNode
}

export function RemoveCardDialog({ taskId, children }: RemoveCardDialogProps) {
	const [open, setOpen] = useState(false)

	const queryClient = useQueryClient()

	const { boardId } = useParams({
		from: '/_app/_organization-set/board/$boardId',
	})

	const { mutate, isPending } = useMutation(
		removeTaskMutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['board', boardId] })
			},
		})
	)

	function handleRemoveCard() {
		mutate(
			{ taskId },
			{
				onError: () => toast.error('Ocorreu um erro ao remover a tarefa'),
				onSuccess: () => toast.success('Tarefa removida com sucesso'),
				onSettled: () => setOpen(false),
			}
		)
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-[90vw] max-w-lg transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>
						Remover tarefa
					</Dialog.Title>

					<div className='h-px bg-zinc-500' />

					<Dialog.Description className='p-4 text-sm text-zinc-500'>
						Tem certeza que deseja remover esta tarefa? Esta ação não pode ser
						desfeita.
					</Dialog.Description>

					<div className='flex justify-end gap-4 p-4'>
						<Dialog.Close asChild>
							<Button
								type='button'
								variant='warning'
								className='w-16 disabled:cursor-wait'
								disabled={isPending}
							>
								Não
							</Button>
						</Dialog.Close>
						<Button
							type='submit'
							className='px-2 disabled:cursor-wait'
							onClick={handleRemoveCard}
							disabled={isPending}
						>
							Sim, remover
						</Button>
					</div>

					<Dialog.Close asChild>
						<Button
							variant='raw'
							className='absolute top-2 right-1.5 p-0.5'
							disabled={isPending}
						>
							<X size={24} />
						</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
