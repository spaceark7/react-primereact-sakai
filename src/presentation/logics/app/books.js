import bookApi from '@/services/api/books'
import { useQuery } from '@tanstack/react-query'

export const bookKeys = {
  all: ['books'],
  lists: () => [...bookKeys.all, 'list'],
  list: (filters) => [...bookKeys.lists(), { filters }],
  details: () => [...bookKeys.all, 'detail'],
  detail: (id) => [...bookKeys.details(), id]
}

export const useFindManyBooks = () => {
  return useQuery({
    queryKey: bookKeys.lists(),
    queryFn: () => bookApi.findMany()
  })
}
