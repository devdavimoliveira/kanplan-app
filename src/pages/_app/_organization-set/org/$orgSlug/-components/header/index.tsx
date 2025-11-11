import { useCanUpdateAndDeleteOrganization } from '@/hooks/permissions/use-can-update-and-delete-organization'
import { useActiveOrganization } from '@/lib/auth/auth-client'
import { type ITabs, Tabs } from './tabs'

export function OrganizationHeader() {
	const { data: activeOrganization } = useActiveOrganization()

	const canUpdateAndDeleteOrganization = useCanUpdateAndDeleteOrganization()

	const tabs: ITabs = [
		{
			name: 'Projetos',
			path: '/org/$orgSlug',
			params: {
				orgSlug: activeOrganization?.slug,
			},
		},
		{
			name: 'Equipe',
			path: '/org/$orgSlug/team',
			params: {
				orgSlug: activeOrganization?.slug,
			},
		},
		{
			name: 'Configurações',
			path: '/org/$orgSlug/settings',
			params: {
				orgSlug: activeOrganization?.slug,
			},
			hidden: !canUpdateAndDeleteOrganization,
		},
	]

	return <Tabs tabs={tabs} />
}
