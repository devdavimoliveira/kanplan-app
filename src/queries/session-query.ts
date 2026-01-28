import { queryOptions } from '@tanstack/react-query'
import { getSession } from '@/lib/auth/auth-client'

export const sessionQueryOptions = () =>
	queryOptions({
		queryKey: ['session'],
		queryFn: () => getSession(),
	})
