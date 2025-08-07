import { cn } from '@/utils/cn'

interface AvatarProps {
	className?: string
}

export function AvatarSkeleton({ className }: AvatarProps) {
	return (
		<div
			className={cn(
				'inline-flex size-8 animate-pulse rounded-full bg-zinc-800',
				className
			)}
		/>
	)
}
