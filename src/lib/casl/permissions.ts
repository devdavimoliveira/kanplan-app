import type { AuthUser, authUserSchema } from './schemas/auth-user'
import { defineAbilityFor, type AppAbility } from './ability'
import { AbilityBuilder } from '@casl/ability'
import type { Role } from '@/types/Role'
import z from 'zod'

type PermissionsByRole = (
	user: AuthUser,
	builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
	owner: (_, { can }) => {
		can('manage', 'all')
	},
	admin: (_, { can }) => {
		can('manage', 'Board')
		can('manage', 'Column')
		can('manage', 'Task')
		can('manage', 'Invitation')
		can('manage', 'Member')
	},
	member: (_, { can }) => {
		can('support', 'Task')
	},
}

type GetUserPermissionsParams = z.infer<typeof authUserSchema>

export function getUserPermissions({ id, role }: GetUserPermissionsParams) {
	const ability = defineAbilityFor({ id, role })

	return ability
}
