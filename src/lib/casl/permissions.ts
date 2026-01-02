import type { AuthUser } from './schemas/auth-user'
import type { AppAbility } from './ability'
import { AbilityBuilder } from '@casl/ability'
import type { Role } from '@/types/Role'

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
	},
	member: (_, { can }) => {
		can('support', 'Task')
	},
}
