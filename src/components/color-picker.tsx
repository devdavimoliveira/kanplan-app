import * as Popover from '@radix-ui/react-popover'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { cn } from '@/utils/cn'

interface ColorPickerProps {
	color?: string
	onChange: (newColor: string) => void
	align?: 'center' | 'end' | 'start'
	triggerClassName?: string
}

export function ColorPicker({
	color = '#0092B8',
	onChange,
	align = 'center',
	triggerClassName,
}: ColorPickerProps) {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button
					type='button'
					className={cn(
						'size-5 cursor-pointer rounded outline-2 outline-zinc-50 outline-offset-2',
						triggerClassName
					)}
					style={{ backgroundColor: color }}
				/>
			</Popover.Trigger>
			<Popover.Content
				sideOffset={10}
				align={align}
				className='rounded-lg bg-zinc-900 p-4 shadow-card'
			>
				<HexColorPicker color={color} onChange={onChange} />
				<HexColorInput
					color={color}
					onChange={onChange}
					prefixed
					className='mt-4 h-8 w-50 rounded-lg bg-zinc-800 px-2 text-right focus-visible:outline-2 focus-visible:outline-cyan-600'
				/>
			</Popover.Content>
		</Popover.Root>
	)
}
