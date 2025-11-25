import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/cn'

interface SelectProps extends ComponentProps<'select'> {}

export function Select({ className, ...props }: SelectProps) {
	return (
		<div className='relative'>
			<select
				className={cn(
					'h-10 w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-800 pl-2',
					className
				)}
				{...props}
			/>
			<div className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
				<ChevronDown />
			</div>
		</div>
	)
}
