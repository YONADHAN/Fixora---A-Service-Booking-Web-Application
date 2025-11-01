import axios, { type AxiosInstance, AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { store } from '@/store/store'
import { adminLogout } from '@/store/slices/admin.slice'
import { customerLogout } from '@/store/slices/customer.slice'
import { vendorLogout } from '@/store/slices/vendor.slice'
import { StatusCodes } from '@/utils/constants/statusCodes'
import { URL_PART } from '@/utils/constants/route'

export const authAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth',
  withCredentials: true,
})
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1',
  withCredentials: true,
})
let isRefreshing = false
let refreshSubscribers: ((token?: string) => void)[] = []

function onRefreshed(token?: string) {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

const handleLogout = (role: string) => {
  switch (role) {
    case URL_PART.customer:
      store.dispatch(customerLogout())
      break
    case URL_PART.admin:
      store.dispatch(adminLogout())
      break
    case URL_PART.vendor:
      store.dispatch(vendorLogout())
      break
    default:
      window.location.href = '/'
  }
}

function getRoleFromUrl(url?: string) {
  const part = url?.split('/')[3] || ''
  return ['admin', 'vendor', 'customer'].includes(part) ? part : ''
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
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

        const refreshEndpoint = '/auth/refresh-token'
        try {
          const { data } = await axiosInstance.post(refreshEndpoint)
          isRefreshing = false
          onRefreshed(data?.token)

          return axiosInstance(originalRequest)
        } catch (refreshError: any) {
          const errorMessage =
            refreshError.response?.data?.message || 'Failed to refresh token'
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
        message.includes('Your account has been blocked'))
    ) {
      toast.info(message || 'Access denied')
      handleLogout(role)
      return Promise.reject(error)
    }

    if (
      error.response?.status === StatusCodes.UNAUTHORIZED &&
      message.includes('Unauthorized access') &&
      message.includes('please login')
    ) {
      toast.info(message || 'Please login in again')
      handleLogout(role)
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)
