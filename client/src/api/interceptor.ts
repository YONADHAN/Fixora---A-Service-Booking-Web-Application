import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'sonner'
import { store } from '@/store/store'
import { adminLogout } from '@/store/slices/admin.slice'
import { vendorLogout } from '@/store/slices/vendor.slice'
import { customerLogout } from '@/store/slices/customer.slice'
import { StatusCodes } from '@/utils/constants/statusCodes'
import { URL_PART } from '@/utils/constants/route'
import {
  ADMIN_ROUTES,
  CUSTOMER_ROUTES,
  VENDOR_ROUTES,
} from '@/utils/constants/api.routes'

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

const handleLogout = (role: string) => {
  switch (role) {
    case URL_PART.customer:
      store.dispatch(customerLogout())
      break
    case URL_PART.vendor:
      store.dispatch(vendorLogout())
      break
    case URL_PART.admin:
      store.dispatch(adminLogout())
      break
    default:
      window.location.href = '/'
  }
}
let isRefreshing = false
let refreshSubscribers: ((token?: string) => void)[] = []

function onRefreshed(token?: string) {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}
function getRoleFromUrl(url?: string) {
  const part = url?.split('/')[3] || ''
  return ['admin', 'vendor', 'customer'].includes(part) ? part : ''
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    console.log(
      'Interceptor triggered',
      error.response?.status,
      error.response?.data
    )
    const originalRequest: any = error.config
    const role = getRoleFromUrl(originalRequest.url)
    const message = error.response?.data?.message || ''

    if (
      error.response?.status === StatusCodes.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      const isRefreshTokenRequest =
        originalRequest.url?.includes('refresh-token')
      if (isRefreshTokenRequest) {
        toast.info('Session expired, please log in again')
        handleLogout(role)
        return Promise.reject(error)
      }

      if (!isRefreshing) {
        isRefreshing = true

        let refreshEndpoint = ''

        switch (role) {
          case URL_PART.admin:
            refreshEndpoint = ADMIN_ROUTES.REFRESH_TOKEN
            break

          case URL_PART.customer:
            refreshEndpoint = CUSTOMER_ROUTES.REFRESH_TOKEN
            break

          case URL_PART.vendor:
            refreshEndpoint = VENDOR_ROUTES.REFRESH_TOKEN
            break

          default:
            refreshEndpoint = ''
            break
        }

        try {
          const { data } = await axiosInstance.post(refreshEndpoint)
          isRefreshing = false
          onRefreshed(data?.token)
          return axiosInstance(originalRequest)
        } catch (refreshError: any) {
          const errorMessage =
            refreshError.response?.data?.message || 'Failed to refresh'
          toast.info(errorMessage)
          isRefreshing = false
          handleLogout(role)
          return Promise.reject(refreshError)
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push(() => {
          resolve(axiosInstance(originalRequest))
        })
      })
    }

    if (
      error.response?.status === StatusCodes.FORBIDDEN &&
      (message.includes('Access denied') ||
        message.includes('Token is blacklisted') ||
        message.includes('Your account has been blocked.'))
    ) {
      toast.info(message || 'Access denied')
      handleLogout(role)

      return Promise.resolve({
        data: { success: false, message },
        status: StatusCodes.FORBIDDEN,
      })
    }

    if (
      error.response?.status === StatusCodes.UNAUTHORIZED &&
      message.includes('Unathorized access') &&
      message.includes('Please login')
    ) {
      toast.info(message || 'Please log in again')
      handleLogout(role)
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)
