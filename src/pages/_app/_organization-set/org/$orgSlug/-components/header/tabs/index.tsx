import type { RegisteredRouter } from '@tanstack/react-router'
import type { FileRoutesByTo } from '@/route-tree.gen'
import { Tab } from './tab'

type Path = keyof FileRoutesByTo

export interface ITab {
	name: string
	path: Path
	params?: RegisteredRouter['routesByPath'][Path]['types']['params']
	hidden?: boolean
}

export type ITabs = ITab[]

interface TabsProps {
	tabs: ITabs
}

export function Tabs({ tabs }: TabsProps) {
	return (
		<div className='flex h-10 items-center'>
			{tabs.map(tab => (
				<Tab
					key={tab.name}
					to={tab.path}
					name={tab.name}
					params={tab.params}
					hidden={tab.hidden}
				/>
			))}
		</div>
	)
}
