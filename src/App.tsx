import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { queryClient } from './lib/query-client'
import { routeTree } from './route-tree.gen'

const router = createRouter({
	routeTree,
	context: { queryClient },
	// defaultPreload: 'intent', // disabled preloading
	defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
			<Toaster richColors position='top-right' />
		</>
	)
}
