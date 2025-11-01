import { axiosInstance } from '@/api/interceptor'

import { ADMIN_ROUTES } from '@/utils/constants/api.routes'
export const adminLogout = async () => {
  const response = await axiosInstance.post(`${ADMIN_ROUTES.LOGOUT}`)
  return response
}
