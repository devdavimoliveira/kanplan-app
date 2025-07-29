import logo from '../../../assets/kanplan-logo.svg'

export default function Welcome() {
	return (
		<div className='flex flex-col items-center'>
			<img src={logo} alt='Kanplan Logo' className='w-[240px]' />
			<p className='text-sm text-zinc-500'>
				Planejamento visual para equipes ágeis.
			</p>
		</div>
	)
}
