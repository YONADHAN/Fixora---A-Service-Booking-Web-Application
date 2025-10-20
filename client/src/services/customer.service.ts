import authAxiosInstance from './api/auth.axios'

import { getErrorMessage } from '@/utils/errors/errorHandler'

import type { ApiResponse, LoginData, SignupData } from '@/types/service.type'

export const customerService = {
  sendOtp: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await authAxiosInstance.post('/otp/send', { email })
      return response.data
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }
  },

  verifyOtp: async (email: string, otp: string): Promise<ApiResponse> => {
    try {
      const response = await authAxiosInstance.post('/otp/verify', {
        email,
        otp,
      })
      return response.data
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }
  },

  signup: async (signupData: SignupData): Promise<ApiResponse> => {
    try {
      const response = await authAxiosInstance.post('/signup', signupData)
      return response.data
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }
  },

  login: async (data: LoginData): Promise<ApiResponse> => {
    try {
      const response = await authAxiosInstance.post('/login', data)
      console.log(response.data)
      return response.data
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await authAxiosInstance.post('/password/forgot', {
        email,
      })
      return response.data
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }
  },

  ResetPassword: async (
    token: string,
    password: string
  ): Promise<ApiResponse> => {
    try {
      const response = await authAxiosInstance.post('/password/reset', {
        token,
        password,
      })
      return response.data
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }
  },
}
