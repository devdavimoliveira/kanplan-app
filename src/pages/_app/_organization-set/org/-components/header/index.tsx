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
	]

	return <Tabs tabs={tabs} />
}
