import { createFileRoute } from '@tanstack/react-router'
import { UserDetailsForm } from './-components/user-details-form'

export const Route = createFileRoute('/_app/account/')({
	component: Account,
})

function Account() {
	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='text-2xl font-bold'>Conta</h1>

			<UserDetailsForm />
		</div>
	)
}
