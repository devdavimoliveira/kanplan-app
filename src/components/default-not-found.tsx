import Lottie from 'lottie-react'
import errorAnimation from '@/assets/animations/lonely-404.json'
import { useNavigate } from '@tanstack/react-router'
import { Button } from './button'
import { ArrowLeft } from 'lucide-react'

export function DefaultNotFound() {
	const navigate = useNavigate()

	function goHome() {
		navigate({ to: '/', replace: true })
	}

	return (
		<div className='mx-auto max-w-5xl py-8 h-dvh px-4'>
			<div className='flex flex-col'>
				<Lottie animationData={errorAnimation} className='xs:h-80' />
				<h1 className='text-2xl font-bold text-center'>
					Página não encontrada
				</h1>
			</div>
			<Button
				variant='link'
				onClick={goHome}
				className='mt-8 mx-auto flex gap-0.5'
			>
				<ArrowLeft size={18} />
				Página Inicial
			</Button>
		</div>
	)
}
