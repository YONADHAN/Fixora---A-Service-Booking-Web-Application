import { authAxiosInstance } from '@/api/auth_axios'
import { RegisterFormData } from '@/lib/schemas/registerSchema'

export const testAuth = async () => {
  const response = await authAxiosInstance.get('/test')
  return response.data
}

export const sendOtp = async (email: string) => {
  const response = await authAxiosInstance.post('/send-otp', { email })
  return response.data
}

export const verifyOtp = async (email: string, otp: string) => {
  const response = await authAxiosInstance.post('/verify-otp', { email, otp })
  return response.data
}

export const signup = async (payload: RegisterFormData) => {
  const response = await authAxiosInstance.post('/signup', payload)
  return response.data
}
