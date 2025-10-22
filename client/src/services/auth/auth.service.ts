import publicAxios from '@/api/public_axios'
import privateAxios from '@/api/private_axios'

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await publicAxios.post('/auth/login', data)
    return res.data
  },

  getProfile: async () => {
    const res = await privateAxios.get('/auth/profile')
    return res.data
  },

  logout: async () => {
    const res = await privateAxios.post('/auth/logout')
    return res.data
  },
}
