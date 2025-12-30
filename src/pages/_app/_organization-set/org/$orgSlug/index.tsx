import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/button'
import { BoardsGrid } from './-components/boards-grid'
import { NewBoardDialog } from './-components/new-board-dialog'
import { Suspense } from 'react'
import { BoardsGridFallback } from './-components/boards-grid-fallback'
import { boardsByOrganizationIdQueryOptions } from '@/queries/organization-queries'
import { Can } from '@/contexts/ability-context'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug/')({
	loader: ({ context: { queryClient, activeOrganization } }) => {
		queryClient.prefetchQuery(
			boardsByOrganizationIdQueryOptions({
				organizationId: activeOrganization.id,
			})
		)
	},
	component: Organization,
})

function Organization() {
	const { activeOrganization, activeMember } = Route.useRouteContext()

	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Quadros</h1>

			<Can I='create' a='Board'>
				<NewBoardDialog
					trigger={<Button className='h-8 w-fit px-2'>Novo quadro</Button>}
					organization={activeOrganization!}
					member={activeMember}
				/>
			</Can>

			<Suspense fallback={<BoardsGridFallback />}>
				<BoardsGrid organizationId={activeOrganization.id} />
			</Suspense>
		</div>
	)
}
