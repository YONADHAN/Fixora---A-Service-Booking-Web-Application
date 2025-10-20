import axios, { type AxiosInstance } from 'axios'
import qs from 'qs'
import { store } from '@/store/store'
import { adminLogout } from '@/store/slices/admin.slice'
import { customerLogout } from '@/store/slices/customer.slice'
import { vendorLogout } from '@/store/slices/vendor.slice'
import toast from 'react-hot-toast'
import type { UnknownAction } from '@reduxjs/toolkit'
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
type Role = 'admin' | 'customer' | 'vendor'
const roleConfigs: Record<
  Role,
  {
    baseURL: string
    logout: () => UnknownAction
    loginRedirect: string
  }
> = {
  admin: {
    baseURL: `${BACKEND_URL}/api/admin`,
    logout: adminLogout,
    loginRedirect: '/admin/login',
  },
  customer: {
    baseURL: `${BACKEND_URL}/api/customer`,
    logout: customerLogout,
    loginRedirect: '/login',
  },
  vendor: {
    baseURL: `${BACKEND_URL}/api/vendor`,
    logout: vendorLogout,
    loginRedirect: '/vendor/login',
  },
}

export const createAxiosInstance = (role: Role): AxiosInstance => {
  const config = roleConfigs[role]

  const instance = axios.create({
    baseURL: config.baseURL,
    withCredentials: true,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  })

  let isRefreshing = false

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      const status = error.response?.status
      const message = error.response?.data?.message

      const shouldRetry = status === 401 && !originalRequest._retry

      const shouldLogout =
        (status === 403 &&
          (message === 'Token is blacklisted' ||
            message === 'Access denied: Your account has been blocked')) ||
        (status === 401 && message === 'Invalid token')

      if (shouldRetry) {
        originalRequest._retry = true
        if (!isRefreshing) {
          isRefreshing = true
          try {
            await instance.post('/refresh-token')
            isRefreshing = false
            return instance(originalRequest)
          } catch (refreshError) {
            isRefreshing = false
            store.dispatch(config.logout())
            window.location.href = config.loginRedirect
            toast('Please login again')
            return Promise.reject(refreshError)
          }
        }
      }

      if (shouldLogout && !originalRequest._retry) {
        store.dispatch(config.logout())
        window.location.href = config.loginRedirect
        toast.error(message || 'Please login again', {
          duration: 3000,
          icon: '!!',
        })
        return Promise.reject(error)
      }
      return Promise.reject(error)
    }
  )
  return instance
}
