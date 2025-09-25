import { Link, type LinkProps, useMatchRoute } from '@tanstack/react-router'
import { cn } from '@/utils/cn'

interface TabProps extends LinkProps {
	name: string
}

export function Tab({ name, ...props }: TabProps) {
	const matchRoute = useMatchRoute()

	const isActive = !!matchRoute({ to: props.to, fuzzy: true })

	return (
		<Link
			className={cn(
				'flex h-full items-center justify-center border-transparent border-b px-2.5 text-sm transition-colors duration-300',
				isActive && 'border-cyan-500'
			)}
			{...props}
		>
			{name}
		</Link>
	)
}
