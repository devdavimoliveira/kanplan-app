import { type DropdownMenuItemProps, Item } from '@radix-ui/react-dropdown-menu'
import { cn } from '@/utils/cn'

export function DropdownMenuItem({
	className,
	...props
}: DropdownMenuItemProps) {
	return (
		<Item
			className={cn(
				'flex h-10 w-full cursor-pointer items-center rounded-lg px-2 text-sm outline-none transition-colors duration-300 hover:bg-zinc-800/50 hover:text-zinc-50',
				className
			)}
			{...props}
		/>
	)
}
