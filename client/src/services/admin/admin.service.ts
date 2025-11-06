import { axiosInstance } from '@/api/interceptor'

import { ADMIN_ROUTES } from '@/utils/constants/api.routes'
export const adminLogout = async () => {
  const response = await axiosInstance.post(`${ADMIN_ROUTES.LOGOUT}`)
  return response
}

export const getAllCustomers = async ({
  page,
  limit,
  search,
  role,
}: {
  page: number
  limit: number
  search: string
  role: string
}) => {
  const response = await axiosInstance.post(
    `${ADMIN_ROUTES.GET_ALL_CUSTOMERS}`,
    { page, limit, search, role }
  )
  return response
}

export const getAllVendors = async ({
  page,
  limit,
  search,
}: {
  page: number
  limit: number
  search: string
}) => {
  const response = await axiosInstance.post(`${ADMIN_ROUTES.GET_ALL_VENDORS}`, {
    page,
    limit,
    search,
  })
  return response
}

export const changeMyUserBlockStatus = async ({
  role,
  userId,
  status,
}: {
  role: string
  userId: string
  status: string
}) => {
  const response = await axiosInstance.post(
    `${ADMIN_ROUTES.CHANGE_MY_USER_BLOCK_STATUS}`,
    { role, userId, status }
  )
  return response
}
