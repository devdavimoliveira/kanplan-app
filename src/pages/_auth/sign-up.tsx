import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sign-up')({
	component: SignUp,
	head: () => ({
		meta: [
			{
				title: 'Sign-up | Kanplan',
			},
		],
	}),
})

function SignUp() {
	return <div>Hello "/_auth/sign-up"!</div>
}
