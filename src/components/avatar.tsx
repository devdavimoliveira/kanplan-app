import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/utils/cn'

interface AvatarProps {
	src?: string
	alt: string
	fallback: string
	fallbackDelay?: number
	className?: string
}

export function Avatar({
	src,
	alt,
	fallback,
	fallbackDelay = 600,
	className,
}: AvatarProps) {
	return (
		<AvatarPrimitive.Root
			className={cn(
				'inline-flex size-8 items-center justify-center rounded-full bg-zinc-800 align-middle font-medium text-base',
				className
			)}
		>
			<AvatarPrimitive.AvatarImage
				src={src}
				alt={alt}
				className='size-full rounded-[inherit] object-cover'
			/>
			<AvatarPrimitive.Fallback
				delayMs={fallbackDelay}
				className='flex size-full items-center justify-center'
			>
				{fallback}
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
	)
}
