import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '@/components/button'
import { organization } from '@/lib/auth-client'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import { BoardsGrid } from './-components/boards-grid'
import { NewBoardDialog } from './-components/new-board-dialog'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug/')({
	beforeLoad: async ({ params }) => {
		const { data: activeOrganization } = await organization.getFullOrganization(
			{
				query: { organizationSlug: params.orgSlug, membersLimit: 0 },
				fetchOptions: {
					onError: ({ error }) => {
						toast.error(
							`Organização não existe ou ${getAuthErrorMessage(error.code).toLowerCase()}`
						)
						throw redirect({ to: '/organizations' })
					},
				},
			}
		)

		if (activeOrganization) {
			await organization.setActive({
				organizationId: activeOrganization!.id,
			})
		}

		return {
			activeOrganization,
		}
	},
	component: Organization,
})

function Organization() {
	const { activeOrganization } = Route.useRouteContext()

	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Quadros</h1>

			<NewBoardDialog
				trigger={<Button className='h-8 w-fit px-2'>Novo quadro</Button>}
				organization={activeOrganization!}
			/>

			<BoardsGrid organizationId={activeOrganization!.id} />
		</div>
	)
}
