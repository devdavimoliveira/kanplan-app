import {
	AbilityBuilder,
	type CreateAbility,
	createMongoAbility,
	type MongoAbility,
} from '@casl/ability'
import z from 'zod'
import { boardSubject } from './subjects/board-subject'
import { columnSubject } from './subjects/column-subject'
import { organizationSubject } from './subjects/organization-subject'
import { taskSubject } from './subjects/task-subject'
import { invitationSubject } from './subjects/invitation-subject'
import type { AuthUser } from './schemas/auth-user'
import { permissions } from './permissions'

const appAbilitiesSchema = z.union([
	organizationSubject,
	boardSubject,
	columnSubject,
	taskSubject,
	invitationSubject,
	z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: AuthUser) {
	const builder = new AbilityBuilder(createAppAbility)

	if (typeof permissions[user.role] !== 'function') {
		throw new Error('Role not found')
	}

	permissions[user.role](user, builder)

	const ability = builder.build()

	ability.can = ability.can.bind(ability)
	ability.cannot = ability.cannot.bind(ability)

	return ability
}
