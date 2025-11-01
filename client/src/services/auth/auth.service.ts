import { authAxiosInstance } from '@/api/auth_axios'
import { RegisterPayload, LoginPayload } from '@/lib/schemas/registerSchema'

export const sendOtp = async (email: string) => {
  const response = await authAxiosInstance.post('/send-otp', { email })
  return response.data
}

export const verifyOtp = async (email: string, otp: string) => {
  const response = await authAxiosInstance.post('/verify-otp', { email, otp })
  return response.data
}

export const signup = async (payload: RegisterPayload) => {
  const response = await authAxiosInstance.post('/signup', payload)
  return response.data
}

export const signin = async (payload: LoginPayload) => {
  const response = await authAxiosInstance.post('/signin', payload)
  return response.data
}

export const forgotPassword = async (email: string, role: string) => {
  const response = await authAxiosInstance.post('/forgot-password', {
    email,
    role,
  })
  return response
}

export const resetPassword = async (
  password: string,
  token: string,
  role: string
) => {
  const response = await authAxiosInstance.post('/reset-password', {
    password,
    token,
    role,
  })
  return response
}

export const logout = async () => {
  const response = await authAxiosInstance.post('/logout')
  return response
}
