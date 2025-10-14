import { useActiveOrganization } from '@/lib/auth-client'
import { type ITabs, Tabs } from './tabs'

export function OrganizationHeader() {
	const { data: activeOrganization } = useActiveOrganization()

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
		},
	]

	return <Tabs tabs={tabs} />
}
