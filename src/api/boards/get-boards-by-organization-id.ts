import { api } from '@/lib/axios'
import type { Board } from '@/types/Board'

export async function getBoardsByOrganizationId({
	organizationId,
}: {
	organizationId: string
}) {
	const { data } = await api.get<Board[]>(
		`/boards/organization/${organizationId}`
	)

	return data
}
