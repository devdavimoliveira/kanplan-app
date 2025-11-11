import type { authClient } from '@/lib/auth/auth-client'

type ErrorTypes = Partial<
	Record<
		keyof typeof authClient.$ERROR_CODES,
		{
			message: string
		}
	>
>

const errorCodes = {
	INVALID_EMAIL_OR_PASSWORD: {
		message: 'E-mail ou senha inválidos',
	},
	ACCOUNT_NOT_FOUND: {
		message: 'Conta não encontrada',
	},
	CREDENTIAL_ACCOUNT_NOT_FOUND: {
		message: 'Conta Credencial não encontrada',
	},
	EMAIL_CAN_NOT_BE_UPDATED: {
		message: 'E-mail não pode ser atualizado',
	},
	EMAIL_NOT_VERIFIED: {
		message: 'E-mail não verificado',
	},
	FAILED_TO_CREATE_SESSION: {
		message: 'Falha ao criar sessão',
	},
	FAILED_TO_CREATE_USER: {
		message: 'Falha ao criar usuário',
	},
	FAILED_TO_GET_SESSION: {
		message: 'Falha ao obter sessão',
	},
	FAILED_TO_GET_USER_INFO: {
		message: 'Falha ao obter informações do usuário',
	},
	FAILED_TO_UNLINK_LAST_ACCOUNT: {
		message: 'Falha ao desvincular última conta',
	},
	FAILED_TO_UPDATE_USER: {
		message: 'Falha ao atualizar usuário',
	},
	ID_TOKEN_NOT_SUPPORTED: {
		message: 'ID token não suportado',
	},
	INVALID_EMAIL: {
		message: 'E-mail inválido',
	},
	INVALID_PASSWORD: {
		message: 'Senha inválida',
	},
	INVALID_TOKEN: {
		message: 'Token inválido',
	},
	PASSWORD_TOO_LONG: {
		message: 'Senha muito longa',
	},
	PASSWORD_TOO_SHORT: {
		message: 'Senha muito curta',
	},
	PROVIDER_NOT_FOUND: {
		message: 'Provedor não encontrado',
	},
	SESSION_EXPIRED: {
		message: 'Sessão expirada',
	},
	USER_NOT_FOUND: {
		message: 'Usuário não encontrado',
	},
	SOCIAL_ACCOUNT_ALREADY_LINKED: {
		message: 'Conta social já vinculada',
	},
	USER_ALREADY_EXISTS: {
		message: 'Usuário já existe',
	},
	USER_ALREADY_HAS_PASSWORD: {
		message: 'Usuário já possui uma senha',
	},
	USER_EMAIL_NOT_FOUND: {
		message: 'E-mail do usuário não encontrado',
	},
	FAILED_TO_RETRIEVE_INVITATION: {
		message: 'Falha ao recuperar convite',
	},
	INVITATION_LIMIT_REACHED: {
		message: 'Limite de convites atingido',
	},
	INVITATION_NOT_FOUND: {
		message: 'Convite não encontrado',
	},
	INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: {
		message: 'O convidado não é mais um membro da organização',
	},
	MEMBER_NOT_FOUND: {
		message: 'Membro não encontrado',
	},
	NO_ACTIVE_ORGANIZATION: {
		message: 'Nenhuma organização ativa',
	},
	ORGANIZATION_ALREADY_EXISTS: {
		message: 'Organização já existe',
	},
	ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: {
		message: 'Limite de membros da organização atingido',
	},
	ORGANIZATION_NOT_FOUND: {
		message: 'Organização não encontrada',
	},
	ROLE_NOT_FOUND: {
		message: 'Cargo não encontrada',
	},
	TEAM_ALREADY_EXISTS: {
		message: 'Equipe já existe',
	},
	TEAM_MEMBER_LIMIT_REACHED: {
		message: 'Limite de membros da equipe atingido',
	},
	TEAM_NOT_FOUND: {
		message: 'Equipe não encontrada',
	},
	UNABLE_TO_REMOVE_LAST_TEAM: {
		message: 'Não é possível remover a última equipe',
	},
	USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: {
		message: 'O usuário já é um membro desta organização',
	},
	USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: {
		message: 'O usuário já foi convidado para esta organização',
	},
	USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: {
		message: 'O usuário não é um membro da organização',
	},
	USER_IS_NOT_A_MEMBER_OF_THE_TEAM: {
		message: 'O usuário não é um membro da equipe',
	},
	YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: {
		message: 'Você não é um membro desta organização',
	},
	YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: {
		message: 'Você não tem permissão para acessar esta organização',
	},
	YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: {
		message: 'Você não tem permissão para cancelar este convite',
	},
	YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: {
		message: 'Você não tem permissão para criar uma nova organização',
	},
	YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: {
		message: 'Você não tem permissão para criar uma nova equipe',
	},
	YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: {
		message: 'Você não tem permissão para criar um novo membro da equipe',
	},
	YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: {
		message: 'Você não tem permissão para criar equipes nesta organização',
	},
	YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: {
		message: 'Você não tem permissão para excluir equipes nesta organização',
	},
	YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: {
		message: 'Você não tem permissão para excluir este membro',
	},
	YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: {
		message: 'Você não tem permissão para excluir esta organização',
	},
	YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: {
		message: 'Você não tem permissão para excluir esta equipe',
	},
	YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: {
		message: 'Você não tem permissão para convidar usuários com este cargo',
	},
	YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: {
		message:
			'Você não tem permissão para convidar usuários para esta organização',
	},
	YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: {
		message: 'Você não tem permissão para remover um membro da equipe',
	},
	YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: {
		message: 'Você não tem permissão para atualizar este membro',
	},
	YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: {
		message: 'Você não tem permissão para atualizar esta organização',
	},
	YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: {
		message: 'Você não tem permissão para atualizar esta equipe',
	},
	YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: {
		message: 'Você não é o destinatário do convite',
	},
	YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: {
		message: 'Você não pode acessar os membros desta equipe',
	},
	YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: {
		message: 'Você não pode sair da organização pois é o único proprietário',
	},
	YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: {
		message: 'Você não tem uma equipe ativa',
	},
	YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: {
		message: 'Você atingiu o número máximo de organizações',
	},
	YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: {
		message: 'Você atingiu o número máximo de equipes',
	},
} satisfies ErrorTypes

export const getAuthErrorMessage = (code: string) => {
	if (code in errorCodes) {
		return errorCodes[code as keyof typeof errorCodes].message
	}
	return ''
}
