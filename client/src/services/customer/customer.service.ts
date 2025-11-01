import { axiosInstance } from '@/api/auth_axios'

export const customerLogout = async () => {
  const response = await axiosInstance.post('/customer/logout')
  return response
}
