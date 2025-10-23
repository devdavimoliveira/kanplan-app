import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/button'
import type { ColumnWithTasks } from '@/types/Column'

interface CreateCardFormProps {
	column: ColumnWithTasks
	onClose: () => void
}

const createCardSchema = z.object({
	description: z.string(),
	position: z.number().positive(),
	boardId: z.uuid(),
})

type CreateCardFormType = z.infer<typeof createCardSchema>

export function CreateCardForm({ column, onClose }: CreateCardFormProps) {
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
			boardId: column.boardId,
		},
	})

	function handleCreateCard(data: CreateCardFormType) {
		if (data.description.length === 0) {
			onClose()
			return
		}

		console.log('Data', data)
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
