import { useSecureLS } from "@/hooks/useSecureLS";
import authApi from '@/core/services/api/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '@/core/services/api/user'

export const authKeys = {
  login: ['login'],
  refreshToken: ['refreshToken'],
  me: ['me']
}

export const useAuthApi = () => {
  const secureStorage = useSecureLS()
  const login = useMutation({
    mutationFn: async (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      console.log('Login successful:', data)
      secureStorage.setItem('user', data.data.user)
      secureStorage.setItem('token', data.data.accessToken)
      console.log('User from SecureStorage:', secureStorage.getItem('user'))
    },
    onError: (error) => {
      console.error('Login failed:', error)
    }
  })

  const refreshToken = async () => {
    // Call refresh token API
    throw new Error('Refresh token not implemented')
  }

  const profile = (id) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: authKeys.me,
      queryFn: async () =>
        userApi.profile({
          id
        }),
      enabled: !!id // Only run if id exists
    })

  return {
    login,
    refreshToken,
    profile
  }
}
