import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '../utils/cn'

const inputVariants = cva(
	'h-10 rounded-lg border border-zinc-800 indent-2 focus-visible:outline-2 disabled:cursor-not-allowed disabled:text-zinc-500',
	{
		variants: {
			variant: {
				default: 'focus-visible:outline-cyan-500',
				warning: 'focus-visible:outline-red-500',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

interface InputVariants extends VariantProps<typeof inputVariants> {}

interface InputProps extends InputVariants, ComponentProps<'input'> {}

export function Input({ className, variant, ...props }: InputProps) {
	return (
		<input className={cn(inputVariants({ variant }), className)} {...props} />
	)
}
