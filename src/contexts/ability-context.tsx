import { defineAbilityFor, type AppAbility } from '@/lib/casl/ability'
import { createContext, type ReactNode } from 'react'
import { createContextualCan } from '@casl/react'
import type { AuthUser } from '@/lib/casl/schemas/auth-user'
import { useContext } from 'react'

export const AbilityContext = createContext({} as AppAbility)
export const Can = createContextualCan(AbilityContext.Consumer)

interface AbilityProviderProps {
	children: ReactNode
	authUser: AuthUser
}

export function AbilityProvider({ children, authUser }: AbilityProviderProps) {
	const ability = defineAbilityFor(authUser)

	return (
		<AbilityContext.Provider value={ability}>
			{children}
		</AbilityContext.Provider>
	)
}

export const useAbility = () => {
	const ability = useContext(AbilityContext)
	return ability
}
