import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '@/components/button'
import { organization } from '@/lib/auth/auth-client'
import { getAuthErrorMessage } from '@/utils/get-auth-error-message'
import { BoardsGrid } from './-components/boards-grid'
import { NewBoardDialog } from './-components/new-board-dialog'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug/')({
	beforeLoad: async ({ params }) => {
		const { data: activeOrganization, error: activeOrganizationError } =
			await organization.getFullOrganization({
				query: { organizationSlug: params.orgSlug, membersLimit: 0 },
			})

		if (activeOrganizationError) {
			toast.error(getAuthErrorMessage(activeOrganizationError.code!))
			throw redirect({ to: '/organizations' })
		}

		await organization.setActive({
			organizationId: activeOrganization.id,
		})

		const { data: activeMember, error: activeMemberError } =
			await organization.getActiveMember()

		if (activeMemberError) {
			toast.error(getAuthErrorMessage(activeMemberError.code!))
			throw redirect({ to: '/organizations' })
		}

		return {
			activeOrganization,
			activeMember,
		}
	},
	component: Organization,
})

function Organization() {
	const { activeOrganization, activeMember } = Route.useRouteContext()

	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-medium text-2xl'>Quadros</h1>

			<NewBoardDialog
				trigger={<Button className='h-8 w-fit px-2'>Novo quadro</Button>}
				organization={activeOrganization!}
				member={activeMember}
			/>

			<BoardsGrid organizationId={activeOrganization.id} />
		</div>
	)
}
