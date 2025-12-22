import { authClient } from '@/lib/auth/auth-client'
import { Button } from '../../../components/button'

export function SocialLogin() {
	async function signInWithGoogle() {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: 'http://localhost:5173/',
		})
	}

	async function signInWithGithub() {
		await authClient.signIn.social({
			provider: 'github',
			callbackURL: 'http://localhost:5173/',
		})
	}

	return (
		<div className='flex flex-col gap-4 sm:flex-row'>
			<Button
				type='button'
				variant='outline'
				className='flex-1/2'
				onClick={signInWithGoogle}
			>
				<svg
					className='mr-1 size-8'
					viewBox='0 0 24 24'
					fill='currentColor'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>Google</title>
					<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
					<g
						id='SVGRepo_tracerCarrier'
						strokeLinecap='round'
						strokeLinejoin='round'
					></g>
					<g id='SVGRepo_iconCarrier'>
						{' '}
						<path d='M19.76 10.77L19.67 10.42H12.23V13.58H16.68C16.4317 14.5443 15.8672 15.3974 15.0767 16.0029C14.2863 16.6084 13.3156 16.9313 12.32 16.92C11.0208 16.9093 9.77254 16.4135 8.81999 15.53C8.35174 15.0685 7.97912 14.5191 7.72344 13.9134C7.46777 13.3077 7.33407 12.6575 7.33 12C7.34511 10.6795 7.86792 9.41544 8.79 8.47002C9.7291 7.58038 10.9764 7.08932 12.27 7.10002C13.3779 7.10855 14.4446 7.52101 15.27 8.26002L17.47 6.00002C16.02 4.70638 14.1432 3.9941 12.2 4.00002C11.131 3.99367 10.0713 4.19793 9.08127 4.60115C8.09125 5.00436 7.19034 5.59863 6.43 6.35002C4.98369 7.8523 4.16827 9.85182 4.15152 11.9371C4.13478 14.0224 4.918 16.0347 6.34 17.56C7.12784 18.3449 8.06422 18.965 9.09441 19.3839C10.1246 19.8029 11.2279 20.0123 12.34 20C13.3484 20.0075 14.3479 19.8102 15.2779 19.42C16.2078 19.0298 17.0488 18.4549 17.75 17.73C19.1259 16.2171 19.8702 14.2347 19.83 12.19C19.8408 11.7156 19.8174 11.2411 19.76 10.77Z'></path>{' '}
					</g>
				</svg>
				Entrar com Google
			</Button>
			<Button
				type='button'
				variant='outline'
				className='flex-1/2'
				onClick={signInWithGithub}
			>
				<svg
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
					fill='currentColor'
					className='mr-1 size-8'
				>
					<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
					<g
						id='SVGRepo_tracerCarrier'
						strokeLinecap='round'
						strokeLinejoin='round'
					></g>
					<g id='SVGRepo_iconCarrier'>
						{' '}
						<title>github</title>{' '}
						<rect width='24' height='24' fill='none'></rect>{' '}
						<path d='M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z'></path>{' '}
					</g>
				</svg>
				Entrar com Github
			</Button>
		</div>
	)
}
