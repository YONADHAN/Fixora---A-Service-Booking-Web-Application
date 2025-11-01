import { axiosInstance } from '@/api/auth_axios'

export const adminLogout = async () => {
  const response = await axiosInstance.post('/admin/logout')
  return response
}
