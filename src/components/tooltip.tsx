import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { type ReactNode, useState } from 'react'

interface TooltipProps extends TooltipPrimitive.TooltipContentProps {
	children: ReactNode
	content: string
	disabled?: boolean
}

export function Tooltip({
	children,
	content,
	disabled,
	...props
}: TooltipProps) {
	const [open, setOpen] = useState(false)

	function handleOpenChange(open: boolean) {
		if (disabled) {
			setOpen(false)
			return
		}

		setOpen(open)
	}

	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root open={open} onOpenChange={handleOpenChange}>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						sideOffset={5}
						className='select-none rounded-lg bg-zinc-800 p-2 text-sm shadow-md'
						{...props}
					>
						{content}
						<TooltipPrimitive.Arrow className='fill-zinc-800' />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	)
}
