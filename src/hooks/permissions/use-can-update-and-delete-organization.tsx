import { useCallback, useEffect, useState } from 'react'
import { organization } from '@/lib/auth/auth-client'

export const useCanUpdateAndDeleteOrganization = () => {
	const [can, setCan] = useState(false)

	const checkPermission = useCallback(async () => {
		await organization.hasPermission({
			permission: {
				organization: ['update', 'delete'],
			},
			fetchOptions: {
				onError: () => {
					setCan(false)
				},
				onSuccess: ({ data }) => {
					setCan(data.success)
				},
			},
		})
	}, [])

	useEffect(() => {
		checkPermission()
	}, [checkPermission])

	return can
}
