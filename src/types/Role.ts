export const RoleEnum = {
	OWNER: 'owner',
	ADMIN: 'admin',
	MEMBER: 'member',
} as const

export type Role = (typeof RoleEnum)[keyof typeof RoleEnum]
