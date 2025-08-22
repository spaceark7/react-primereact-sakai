import baseApi from "@/core/http-client/baseApi"

const userApi = {
  findMany: async (_params = {}) => {
    const params = Object.entries(_params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    try {
      const response = await baseApi.get(`/users?${params}`, {
        headers: {
          'require-auth': true
        }
      })
      console.log(response.data)
      if (response.status !== 200) {
        throw new Error('Failed to fetch users')
      }
      const { data } = response.data
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  profile: async (params = {}) => {
    try {
      const response = await baseApi.get(`/profile/${params.id}`, {
        headers: {
          'require-auth': true
        }
      })
      console.log(response.data)
      if (response.status !== 200) {
        throw new Error('Failed to fetch user profile')
      }
      const { data } = response.data
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default userApi
