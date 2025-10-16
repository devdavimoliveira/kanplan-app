import { api } from '@/lib/axios'
import type { Board } from '@/types/Board'

export interface CreateBoardBody {
	name: string
	highlightColor: string
	organizationId: string
	memberId: string
}

export async function createBoard(body: CreateBoardBody) {
	const { data } = await api.post<Board>('/boards/create', body)

	return data
}
