import { axiosInstance } from '@/api/interceptor'

import { VENDOR_ROUTES } from '@/utils/constants/api.routes'
export const vendorLogout = async () => {
  const response = await axiosInstance.post(`${VENDOR_ROUTES.LOGOUT}`)
  return response
}
