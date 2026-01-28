import {
	AbilityBuilder,
	type CreateAbility,
	createMongoAbility,
	type MongoAbility,
} from '@casl/ability'
import z from 'zod'
import { permissions } from './permissions'
import type { AuthUser } from './schemas/auth-user'
import { boardSubject } from './subjects/board-subject'
import { columnSubject } from './subjects/column-subject'
import { invitationSubject } from './subjects/invitation-subject'
import { memberSubject } from './subjects/member-subject'
import { organizationSubject } from './subjects/organization-subject'
import { taskSubject } from './subjects/task-subject'

const appAbilitiesSchema = z.union([
	organizationSubject,
	boardSubject,
	columnSubject,
	taskSubject,
	invitationSubject,
	memberSubject,
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

	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename
		},
	})

	ability.can = ability.can.bind(ability)
	ability.cannot = ability.cannot.bind(ability)

	return ability
}
