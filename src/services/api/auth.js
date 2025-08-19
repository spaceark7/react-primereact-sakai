/* eslint-disable no-unused-vars */
import baseApi from '@/core/api/baseApi'

const authApi = {
  login: async (credentials) => {
    try {
      const response = await baseApi.post('/auth/login', credentials, {
        headers: {
          'require-auth': true
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default authApi
