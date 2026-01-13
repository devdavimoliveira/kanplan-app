import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouteContext } from '@tanstack/react-router'
import { produce } from 'immer'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/button'
import { createTaskMutationOptions } from '@/mutations/tasks-mutations'
import type { BoardWithColumnsAndTasks } from '@/types/Board'
import type { ColumnWithTasks } from '@/types/Column'

interface CreateCardFormProps {
	column: ColumnWithTasks
	boardHighlightColor: string
	onClose: () => void
}

const createCardSchema = z.object({
	description: z.string(),
	position: z.number().positive(),
	columnId: z.uuid(),
	createdBy: z.string(),
})

type CreateCardFormType = z.infer<typeof createCardSchema>

export function CreateCardForm({
	column,
	boardHighlightColor,
	onClose,
}: CreateCardFormProps) {
	const queryClient = useQueryClient()

	const { boardId } = useParams({
		from: '/_app/_organization-set/org/$orgSlug/board/$boardId/',
	})

	const { activeMember } = useRouteContext({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	const {
		register,
		handleSubmit,
		setFocus,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(createCardSchema),
		values: {
			description: '',
			position: column.tasks.length + 1,
			columnId: column.id,
			createdBy: activeMember.userId,
		},
	})

	const { mutate } = useMutation(
		createTaskMutationOptions({
			onMutate: async ({ description, position, columnId, createdBy }) => {
				await queryClient.cancelQueries({ queryKey: ['board', boardId] })

				const prevBoard = queryClient.getQueryData<BoardWithColumnsAndTasks>([
					'board',
					boardId,
				])

				queryClient.setQueryData(
					['board', boardId],
					(old: BoardWithColumnsAndTasks) => {
						const columnIndex = old.columns.findIndex(
							column => column.id === columnId
						)

						return produce(old, draft => {
							draft.columns[columnIndex].tasks.push({
								id: Date.now().toString(),
								description,
								position,
								columnId,
								markingColor: boardHighlightColor,
								createdAt: Date.now().toString(),
								createdBy,
								assignedBy: null,
								assignedUser: null,
							})
						})
					}
				)

				return { prevBoard }
			},
			onError: (_, __, context) => {
				if (context?.prevBoard) {
					queryClient.setQueryData(['board', boardId], context.prevBoard)
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: ['board', boardId] })
			},
		})
	)

	function handleCreateCard(data: CreateCardFormType) {
		if (data.description.length === 0) {
			onClose()
			return
		}

		mutate(
			{
				description: data.description,
				position: data.position,
				columnId: data.columnId,
				createdBy: data.createdBy,
			},
			{
				onError: () => {
					toast.error('Ocorreu um erro ao criar o cartão')
				},
				onSettled: () => {
					onClose()
				},
			}
		)
	}

	useEffect(() => {
		setFocus('description')
	}, [setFocus])

	return (
		<form onSubmit={handleSubmit(handleCreateCard)}>
			<textarea
				rows={3}
				placeholder='Insira uma descrição'
				className='mb-2 block w-full resize-none rounded-lg p-2 outline-none focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-solid'
				{...register('description')}
			/>
			<div className='flex items-center justify-between'>
				<Button type='submit' className='px-2' disabled={isSubmitting}>
					Adicionar cartão
				</Button>
				<Button
					variant='ghost'
					type='button'
					className='px-1'
					onClick={onClose}
				>
					<X size={20} />
				</Button>
			</div>
		</form>
	)
}
