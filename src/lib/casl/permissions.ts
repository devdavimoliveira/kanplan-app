import type { AbilityBuilder } from '@casl/ability'
import type z from 'zod'
import type { Role } from '@/types/Role'
import { type AppAbility, defineAbilityFor } from './ability'
import type { AuthUser, authUserSchema } from './schemas/auth-user'

type PermissionsByRole = (
	user: AuthUser,
	builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
	owner: (_, { can }) => {
		can('manage', 'all')
	},
	admin: (_, { can, cannot }) => {
		can('manage', 'Board')
		can('manage', 'Column')
		can('manage', 'Task')
		can('manage', 'Invitation')
		can('manage', 'Member')

		cannot('delete', 'Member', { role: { $in: ['owner', 'admin'] } })
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
