import { createFileRoute } from '@tanstack/react-router'
import { useActiveOrganization } from '@/lib/auth-client'

export const Route = createFileRoute('/_app/_organization-set/org/$orgSlug')({
	component: Organization,
})

function Organization() {
	const { data, isPending } = useActiveOrganization()

	if (isPending) return <div>Carregando...</div>

	return <div>{data?.name}</div>
}
