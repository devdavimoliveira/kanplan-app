export function BoardCardSkeleton() {
	return (
		<div className='flex h-30 animate-pulse flex-col rounded-lg bg-zinc-900'>
			<div className='h-full rounded-t-lg bg-zinc-800' />
			<div className='flex h-10 shrink-0 items-center p-2'>
				<span className='h-5 w-2/3 rounded-lg bg-zinc-800' />
			</div>
		</div>
	)
}
