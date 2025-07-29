import type { ComponentProps } from 'react'
import { cn } from '../utils/cn'

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ className, ...props }: ButtonProps) {
	return (
		<button
			className={cn(
				'h-10 cursor-pointer rounded-lg border border-cyan-500 font-semibold text-cyan-500 outline-none transition-colors duration-300 hover:bg-cyan-500 hover:text-inherit focus:bg-cyan-500 focus:text-inherit',
				className
			)}
			{...props}
		/>
	)
}
