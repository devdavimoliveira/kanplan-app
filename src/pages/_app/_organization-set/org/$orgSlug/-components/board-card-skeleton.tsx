export function BoardCardSkeleton() {
	return (
		<div className='flex h-30 flex-col rounded-lg bg-zinc-900 animate-pulse'>
			<div className='h-full rounded-t-lg bg-zinc-800' />
			<div className='h-10 shrink-0 p-2 flex items-center'>
				<span className='bg-zinc-800 h-5 w-2/3 rounded-lg' />
			</div>
		</div>
	)
}
