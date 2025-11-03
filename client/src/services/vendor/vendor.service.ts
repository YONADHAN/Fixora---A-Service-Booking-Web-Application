import { axiosInstance } from '@/api/interceptor'

import { VENDOR_ROUTES } from '@/utils/constants/api.routes'
export const vendorLogout = async () => {
  const response = await axiosInstance.post(`${VENDOR_ROUTES.LOGOUT}`)
  return response
}

export const vendorProfileInfo = async () => {
  const response = await axiosInstance.get(`${VENDOR_ROUTES.GET_PROFILE_INFO}`)
  return response
}

export const venderProfileInfoUpdate = async (data: any) => {
  const response = await axiosInstance.patch(
    VENDOR_ROUTES.UPDATE_PROFILE_INFO,
    data
  )
  return response.data
}
