import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '../utils/cn'

const buttonVariants = cva(
	'inline-flex items-center justify-center font-semibold rounded-lg h-10 whitespace-nowrap text-sm cursor-pointer transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2',
	{
		variants: {
			variant: {
				default:
					'bg-cyan-600 not-disabled:hover:bg-cyan-600/80 focus-visible:outline-cyan-600',
				outline:
					'bg-transparent text-cyan-600 border border-cyan-600 not-disabled:hover:bg-cyan-600 not-disabled:hover:text-zinc-50 focus-visible:outline-cyan-600',
				ghost:
					'bg-transparent not-disabled:hover:bg-zinc-800/50 focus-visible:outline-zinc-800',
				link: 'text-cyan-600 not-disabled:hover:underline underline-offset-2',
				warning:
					'bg-red-500 not-disabled:hover:bg-red-500/80 focus-visible:outline-red-500',
				raw: 'bg-transparent h-auto not-disabled:hover:bg-transparent focus-visible:outline-none focus-visible:outline-offset-0',
			},
			active: {
				true: null,
				false: null,
			},
		},
		defaultVariants: {
			variant: 'default',
			active: false,
		},
		compoundVariants: [
			{
				variant: 'ghost',
				active: true,
				className: 'bg-zinc-800/50',
			},
		],
	}
)

interface ButtonVariants extends VariantProps<typeof buttonVariants> {}

interface ButtonProps extends ButtonVariants, ComponentProps<'button'> {
	asChild?: boolean
	active?: boolean
}

export function Button({
	className,
	variant,
	asChild = false,
	active = false,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			className={cn(buttonVariants({ variant, active }), className)}
			{...props}
		/>
	)
}
