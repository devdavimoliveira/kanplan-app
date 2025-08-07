import { Eye, EyeOff } from 'lucide-react'
import { type ComponentProps, useState } from 'react'
import { cn } from '../utils/cn'
import { Button } from './button'

interface PasswordInputProps extends Omit<ComponentProps<'input'>, 'type'> {}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
	const [isVisible, setIsVisible] = useState(false)

	function toggleVisibility() {
		setIsVisible(prevState => !prevState)
	}

	return (
		<div className='relative'>
			<input
				type={isVisible ? 'text' : 'password'}
				className={cn(
					'block h-10 w-full rounded-lg border border-zinc-800 pr-12 indent-2 focus:outline-2 focus:outline-cyan-500',
					className
				)}
				{...props}
			/>
			<Button
				type='button'
				variant='ghost'
				onClick={toggleVisibility}
				className='-translate-y-1/2 absolute top-1/2 right-2 h-auto transform rounded-full p-2'
			>
				{isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
			</Button>
		</div>
	)
}
