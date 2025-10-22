import type { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

export const setupInterceptorsTo = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('accessToken')
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        Cookies.remove('accessToken')
        window.location.href = '/auth/signin'
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
