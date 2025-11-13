import { sessionQueryOptions } from '@/queries/session-query'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

interface RootRouteContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
	beforeLoad: async ({ context: { queryClient } }) => {
		const { data: session } = await queryClient.fetchQuery(
			sessionQueryOptions()
		)

		return { session }
	},
	component: RootComponent,
})

function RootComponent() {
	return (
		<>
			<HeadContent />
			<Outlet />
			<TanStackRouterDevtools position='bottom-left' />
			<ReactQueryDevtools buttonPosition='bottom-right' />
		</>
	)
}
