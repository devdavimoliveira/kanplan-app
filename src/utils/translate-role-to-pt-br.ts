import type { Role } from '@/types/Role'

export function translateRoleToPtBR(role: Role) {
	switch (role) {
		case 'owner':
			return 'Proprietário'
		case 'admin':
			return 'Administrador'
		case 'member':
			return 'Membro'
		default:
			return 'Membro'
	}
}
