import type { ComponentProps } from 'react'
import { cn } from '../utils/cn'

interface InputProps extends ComponentProps<'input'> {}

export function Input({ className, ...props }: InputProps) {
	return (
		<input
			className={cn(
				'h-10 rounded-lg border border-zinc-800 indent-2 focus:outline-2 focus:outline-cyan-500',
				className
			)}
			{...props}
		/>
	)
}
