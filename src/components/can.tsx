import type { ReactNode } from 'react'
import { authClient } from '@/lib/auth/auth-client'
import type { ac } from '@/lib/auth/permissions'

type MutableArrays<T> = {
	[K in keyof T]?: T[K] extends readonly (infer U)[] ? U[] : T[K]
}

interface CanProps {
	role: typeof authClient.$Infer.Member.role
	permissions: MutableArrays<typeof ac.statements>
	children: ReactNode
}

export default function Can({ role, permissions, children }: CanProps) {
	const condition = authClient.organization.checkRolePermission({
		role,
		permissions,
	})

	return condition && children
}
