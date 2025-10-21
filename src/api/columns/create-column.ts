import { api } from '@/lib/axios'
import type { Column } from '@/types/Column'

export interface CreateColumnBody {
	title: string
	position: number
	boardId: string
}

export async function createColumn(body: CreateColumnBody) {
	const { data } = await api.post<Column>('/columns/create', body)

	return data
}
