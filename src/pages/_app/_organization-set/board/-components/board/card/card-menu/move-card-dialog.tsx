import * as Dialog from '@radix-ui/react-dialog'
import { MoveRight, X } from 'lucide-react'
import { Button } from '@/components/button'
import { useParams } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { ColumnWithTasks } from '@/types/Column'

interface MoveCardDialogProps {
	taskId: string
}

export function MoveCardDialog({ taskId }: MoveCardDialogProps) {
	const { boardId } = useParams({
		from: '/_app/_organization-set/board/$boardId',
	})

	const queryClient = useQueryClient()

	const board = queryClient.getQueryData<BoardWithColumnsAndTasks>([
		'board',
		boardId,
	])

	function isCurrentTask(column: ColumnWithTasks, taskId: string) {
		return column.tasks.findIndex(task => task.id === taskId) !== -1
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button type='button' variant='raw' className='justify-start gap-2 p-1'>
					<MoveRight size={18} />
					Mover
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-xs' />
				<Dialog.Content className='-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-[90vw] max-w-lg transform rounded-lg bg-zinc-900 shadow-card'>
					<Dialog.Title className='p-4 font-medium'>Mover cartão</Dialog.Title>

					<div className='h-px bg-zinc-500' />

					<Dialog.Description className='p-4 text-sm text-zinc-500'>
						Selecione uma nova coluna para este cartão.
					</Dialog.Description>

					<div className='p-4'>
						<select className='w-full rounded-md border bg-zinc-800 px-2 py-1 text-sm text-zinc-200 border-none outline-none'>
							<option value=''>Selecione uma coluna</option>
							{board?.columns.map(column => (
								<option
									key={column.id}
									value={column.id}
									disabled={isCurrentTask(column, taskId)}
								>
									{column.title}
								</option>
							))}
						</select>
					</div>

					<div className='flex justify-end gap-4 p-4'>
						<Dialog.Close asChild>
							<Button type='button' variant='warning' className='w-16'>
								Cancelar
							</Button>
						</Dialog.Close>
						<Button type='submit' className='px-2'>
							Mover
						</Button>
					</div>

					<Dialog.Close asChild>
						<Button variant='raw' className='absolute top-2 right-1.5 p-0.5'>
							<X size={24} />
						</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
