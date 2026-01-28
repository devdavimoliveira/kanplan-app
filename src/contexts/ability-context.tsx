import { createContextualCan } from '@casl/react'
import { createContext, type ReactNode, useContext } from 'react'
import { type AppAbility, defineAbilityFor } from '@/lib/casl/ability'
import type { AuthUser } from '@/lib/casl/schemas/auth-user'

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
