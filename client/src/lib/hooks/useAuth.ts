// lib/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query'
import {
  signup,
  sendOtp,
  verifyOtp,
  signin,
  forgotPassword,
} from '@/services/auth/auth.service'
import { LoginPayload, RegisterPayload } from '../schemas/registerSchema' // ✅ Changed from RegisterFormData

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      return await signup(payload)
    },
  })
}

export const useSignin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      return await signin(payload)
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

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: { email: string; role: string }) =>
      forgotPassword(data.email, data.role),
  })
}
