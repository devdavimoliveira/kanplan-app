import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { Link } from '@tanstack/react-router'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/button'
import { NewOrganizationDialog } from '@/components/new-organization-dialog'
import { useListOrganizations } from '@/lib/auth/auth-client'
import { DropdownMenuItem } from './item'

export function DropdownOrganizations() {
	const [open, setOpen] = useState(false)

	const { data: organizations } = useListOrganizations()

	return (
		<DropdownPrimitive.Root open={open} onOpenChange={setOpen}>
			<DropdownPrimitive.Trigger asChild>
				<Button variant='ghost' className='px-1.5' active={open}>
					<ChevronsUpDown size={18} className='text-zinc-500' />
				</Button>
			</DropdownPrimitive.Trigger>

			<DropdownPrimitive.Portal>
				<DropdownPrimitive.Content
					align='start'
					sideOffset={10}
					className='flex w-60 flex-col gap-2 rounded-lg bg-zinc-900 p-2 text-zinc-500 shadow-md shadow-zinc-900/50'
				>
					<div>
						{organizations?.map(organization => (
							<DropdownMenuItem key={organization.id} asChild>
								<Link
									to='/org/$orgSlug'
									params={{ orgSlug: organization.slug }}
								>
									{organization.name}
								</Link>
							</DropdownMenuItem>
						))}
					</div>

					<DropdownPrimitive.Separator className='h-px bg-zinc-500' />

					<DropdownMenuItem asChild>
						<Link to='/organizations'>Todas organizações</Link>
					</DropdownMenuItem>

					<DropdownPrimitive.Separator className='h-px bg-zinc-500' />

					<NewOrganizationDialog
						trigger={
							<Button variant='ghost' className='justify-start px-2'>
								<Plus className='mr-2 size-4.5' />
								<span>Nova organização</span>
							</Button>
						}
						onSuccess={() => setOpen(false)}
					/>
				</DropdownPrimitive.Content>
			</DropdownPrimitive.Portal>
		</DropdownPrimitive.Root>
	)
}
