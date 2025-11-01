import { axiosInstance } from '@/api/interceptor'

import { CUSTOMER_ROUTES } from '@/utils/constants/api.routes'
export const customerLogout = async () => {
  const response = await axiosInstance.post(`${CUSTOMER_ROUTES.LOGOUT}`)
  return response
}
