import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import type { Board } from '@/types/Board'
import { BoardCard } from './board-card'

interface BoardsGridProps {
	organizationId: string
}

export function BoardsGrid({ organizationId }: BoardsGridProps) {
	const [boards, setBoards] = useState<Board[]>([])

	const fetchData = useCallback(async (organizationId: string) => {
		const { data } = await api.get<Board[]>(
			`/boards/organization/${organizationId}`
		)

		setBoards(data)
	}, [])

	useEffect(() => {
		fetchData(organizationId)
	}, [fetchData, organizationId])

	return (
		<div className='grid xs:grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
			{boards.map(board => (
				<BoardCard key={board.id} board={board} />
			))}
		</div>
	)
}
