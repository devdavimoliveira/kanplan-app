import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<div className='p-2'>
			<h3 className='text-emerald-500'>Index Page</h3>
		</div>
	)
}
