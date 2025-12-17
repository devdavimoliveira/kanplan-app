import { organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_BETTER_AUTH_CLIENT_BASE_URL,
	basePath: import.meta.env.VITE_BETTER_AUTH_CLIENT_BASE_PATH,
	plugins: [organizationClient()],
})

export const {
	useSession,
	signIn,
	signUp,
	signOut,
	getSession,
	useListOrganizations,
	useActiveOrganization,
	organization,
} = authClient
