import { getSession } from '@/lib/auth/auth-client'
import { queryOptions } from '@tanstack/react-query'

export const sessionQueryOptions = () =>
	queryOptions({
		queryKey: ['session'],
		queryFn: () => getSession(),
	})
