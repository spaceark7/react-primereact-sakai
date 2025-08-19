/* eslint-disable no-unused-vars */
import baseApi from '@/core/api/baseApi'

const bookApi = {
  findMany: async (_params = {}) => {
    try {
      const response = await baseApi.get('/books', {
        headers: {
          'require-auth': true
        }
      })
      console.log(response.data)
      if (response.status !== 200) {
        throw new Error('Failed to fetch books')
      }
      const { data } = response.data
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default bookApi
