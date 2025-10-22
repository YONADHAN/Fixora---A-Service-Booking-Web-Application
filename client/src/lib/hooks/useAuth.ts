import { useMutation } from '@tanstack/react-query'
import { signup, sendOtp, verifyOtp } from '@/services/auth/auth.service'
import { RegisterFormData } from '../schemas/registerSchema'

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: RegisterFormData) => {
      return await signup(payload)
    },
  })
}

// Send OTP hook
export const useSendOtp = () => {
  return useMutation({
    mutationFn: (email: string) => sendOtp(email),
  })
}

// Verify OTP hook
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: { email: string; otp: string }) =>
      verifyOtp(data.email, data.otp),
  })
}
