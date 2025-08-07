import { Avatar } from '@/components/avatar'

export function OrganizationCardSkeleton() {
	return (
		<div className='flex min-h-16 animate-pulse items-center gap-2 rounded-lg bg-zinc-900 p-2'>
			<Avatar alt='Logo' fallback={''} className='shrink-0' />
			<div className='flex w-full flex-col gap-1.5'>
				<div className='h-2 w-1/2 rounded-lg bg-zinc-800' />
				<span className='h-2 w-1/3 rounded-lg bg-zinc-800' />
			</div>
		</div>
	)
}
