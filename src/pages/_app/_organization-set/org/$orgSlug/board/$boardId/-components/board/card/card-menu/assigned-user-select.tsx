import * as Select from '@radix-ui/react-select'
import { useRouteContext } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import type { EditCardFormType } from './edit-card-dialog'

export function AssignedUserSelect() {
	const { activeOrganization } = useRouteContext({
		from: '/_app/_organization-set/org/$orgSlug',
	})

	const { control } = useFormContext<EditCardFormType>()

	function handleChange(value: string, onChange: (value: string) => void) {
		if (value === 'clear') {
			onChange('')
		} else {
			onChange(value)
		}
	}

	return (
		<Controller
			name='assignedBy'
			control={control}
			render={({ field: { value, onChange } }) => (
				<Select.Root
					value={value ?? ''}
					onValueChange={value => handleChange(value, onChange)}
				>
					<Select.Trigger className='inline-flex h-8 w-30 items-center justify-between rounded-lg bg-zinc-800 p-2'>
						<Select.Value placeholder='Ninguém' />
						<Select.Icon className='pl-0.5'>
							<ChevronDown />
						</Select.Icon>
					</Select.Trigger>
					<Select.Portal>
						<Select.Content
							position='popper'
							sideOffset={5}
							className='min-w-30 rounded-md bg-zinc-800'
						>
							<Select.Viewport className='p-1'>
								<Select.Item
									value='clear'
									disabled={!value}
									className='flex h-6 select-none items-center rounded-md px-2 text-sm data-disabled:text-zinc-500'
								>
									<Select.ItemText>Ninguém</Select.ItemText>
								</Select.Item>
								{activeOrganization?.members.map(member => (
									<Select.Item
										key={member.userId}
										value={member.userId}
										className='flex h-6 select-none items-center rounded-md px-2 text-sm'
									>
										<Select.ItemText>{member.user.name}</Select.ItemText>
									</Select.Item>
								))}
							</Select.Viewport>
						</Select.Content>
					</Select.Portal>
				</Select.Root>
			)}
		/>
	)
}
