import { createFileRoute } from '@tanstack/react-router'
import { UserDetailsForm } from './-components/user-details-form'

export const Route = createFileRoute('/_app/account/')({
	component: Account,
})

function Account() {
	return (
		<div className='mx-auto flex max-w-5xl flex-col gap-8 py-8'>
			<h1 className='font-bold text-2xl'>Conta</h1>

			<UserDetailsForm />
		</div>
	)
}
