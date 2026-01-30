import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Spinner } from '@/components/spinner'
import { sessionQueryOptions } from '@/queries/session-query'

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
	pendingComponent: LoadingScreen,
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

function LoadingScreen() {
	return (
		<div className='flex h-dvh items-center justify-center'>
			<Spinner />
		</div>
	)
}
