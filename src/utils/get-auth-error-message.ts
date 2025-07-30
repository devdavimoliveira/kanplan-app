import type { authClient } from "@/lib/auth-client";

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      message: string;
    }
  >
>;

const errorCodes = {
  INVALID_EMAIL_OR_PASSWORD: {
    message: "E-mail ou senha inválidos",
  },
  ACCOUNT_NOT_FOUND: {
    message: "Conta não encontrada",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    message: "Conta Credencial não encontrada",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    message: "E-mail não pode ser atualizado",
  },
  EMAIL_NOT_VERIFIED: {
    message: "E-mail não verificado",
  },
  FAILED_TO_CREATE_SESSION: {
    message: "Falha ao criar sessão",
  },
  FAILED_TO_CREATE_USER: {
    message: "Falha ao criar usuário",
  },
  FAILED_TO_GET_SESSION: {
    message: "Falha ao obter sessão",
  },
  FAILED_TO_GET_USER_INFO: {
    message: "Falha ao obter informações do usuário",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    message: "Falha ao desvincular última conta",
  },
  FAILED_TO_UPDATE_USER: {
    message: "Falha ao atualizar usuário",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    message: "ID token não suportado",
  },
  INVALID_EMAIL: {
    message: "E-mail inválido",
  },
  INVALID_PASSWORD: {
    message: "Senha inválida",
  },
  INVALID_TOKEN: {
    message: "Token inválido",
  },
  PASSWORD_TOO_LONG: {
    message: "Senha muito longa",
  },
  PASSWORD_TOO_SHORT: {
    message: "Senha muito curta",
  },
  PROVIDER_NOT_FOUND: {
    message: "Provedor não encontrado",
  },
  SESSION_EXPIRED: {
    message: "Sessão expirada",
  },
  USER_NOT_FOUND: {
    message: "Usuário não encontrado",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    message: "Conta social já vinculada",
  },
  USER_ALREADY_EXISTS: {
    message: "Usuário já existe",
  },
  USER_ALREADY_HAS_PASSWORD: {
    message: "Usuário já possui uma senha",
  },
  USER_EMAIL_NOT_FOUND: {
    message: "E-mail do usuário não encontrado",
  },
} satisfies ErrorTypes;

export const getAuthErrorMessage = (code: string) => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes].message;
  }
  return "";
};
