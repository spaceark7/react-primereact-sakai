import userApi from '@/core/services/api/user'
import { useQuery } from '@tanstack/react-query'

export const userKeys = {
  all: ['users'],
  list: (params) => [...userKeys.all, 'list', params],
  detail: (id) => [...userKeys.all, 'detail', id]
}

export const useUserApi = () => {
  const findMany = (params = {}) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: userKeys.list(params),
      queryFn: async () => userApi.findMany(params),
      enabled: !!params.name
    })

  return {
    findMany
  }
}
