import { Link } from '@tanstack/react-router'
import { Avatar } from '@/components/avatar'
import type { Organization } from '@/types/Organization'

interface OrganizationCardProps {
	organization: Organization
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
	return (
		<Link to='/organizations/$orgSlug' params={{ orgSlug: organization.slug }}>
			<div className='flex min-h-16 items-center gap-2 rounded-lg bg-zinc-900 p-2'>
				<Avatar
					alt='Logo'
					fallback={organization.name.slice(0, 2)}
					className='shrink-0'
				/>
				<div className='flex flex-col gap-0.5'>
					<h3 className='font-semibold text-sm'>{organization.name}</h3>
					<span className='text-xs text-zinc-500'>Plano Gratuito</span>
				</div>
			</div>
		</Link>
	)
}
