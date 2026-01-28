import { useNavigate } from '@tanstack/react-router'
import Lottie from 'lottie-react'
import { ArrowLeft } from 'lucide-react'
import errorAnimation from '@/assets/animations/lonely-404.json'
import { Button } from './button'

export function DefaultNotFound() {
	const navigate = useNavigate()

	function goHome() {
		navigate({ to: '/', replace: true })
	}

	return (
		<div className='mx-auto h-dvh max-w-5xl px-4 py-8'>
			<div className='flex flex-col'>
				<Lottie animationData={errorAnimation} className='xs:h-80' />
				<h1 className='text-center font-bold text-2xl'>
					Página não encontrada
				</h1>
			</div>
			<Button
				variant='link'
				onClick={goHome}
				className='mx-auto mt-8 flex gap-0.5'
			>
				<ArrowLeft size={18} />
				Página Inicial
			</Button>
		</div>
	)
}
