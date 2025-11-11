import { createAccessControl } from 'better-auth/plugins/access'

import {
	adminAc,
	defaultStatements,
	memberAc,
	ownerAc,
} from 'better-auth/plugins/organization/access'

const statement = {
	...defaultStatements,
	board: ['create', 'update', 'delete'],
	task: ['create', 'update', 'delete'],
} as const

const ac = createAccessControl(statement)

const member = ac.newRole({
	board: [],
	task: ['update'],
	...memberAc.statements,
})

const admin = ac.newRole({
	board: ['create', 'update', 'delete'],
	task: ['create', 'update', 'delete'],
	...adminAc.statements,
})

const owner = ac.newRole({
	board: ['create', 'update', 'delete'],
	task: ['create', 'update', 'delete'],
	...ownerAc.statements,
})

export { ac, member, admin, owner }
