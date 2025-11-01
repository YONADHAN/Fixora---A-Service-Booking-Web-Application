import { axiosInstance } from '@/api/auth_axios'

export const vendorLogout = async () => {
  const response = await axiosInstance.post('/vendor/logout')
  return response
}
