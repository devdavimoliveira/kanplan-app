import { Link, type LinkProps, useMatchRoute } from '@tanstack/react-router'
import { cn } from '@/utils/cn'

interface TabProps extends LinkProps {
	name: string
	hidden?: boolean
}

export function Tab({ name, hidden, ...props }: TabProps) {
	const matchRoute = useMatchRoute()

	const isActive = !!matchRoute({ to: props.to })

	return (
		<Link
			className={cn(
				'group flex h-full border-transparent border-b py-1 text-sm transition-colors duration-300',
				isActive && 'border-cyan-500'
			)}
			hidden={hidden}
			{...props}
		>
			<div className='flex items-center rounded px-2 transition-colors duration-300 group-hover:bg-zinc-800/50'>
				{name}
			</div>
		</Link>
	)
}
