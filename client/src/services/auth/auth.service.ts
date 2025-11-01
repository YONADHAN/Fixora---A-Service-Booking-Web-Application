// import { authAxiosInstance } from '@/api/auth_axios'
// import { RegisterPayload, LoginPayload } from '@/lib/schemas/registerSchema'
// import { AUTH_ROUTES } from '@/utils/constants/api.routes'

// export const sendOtp = async (email: string) => {
//   const response = await authAxiosInstance.post('/send-otp', { email }) //instead i can write like backend url + /api/v1/ + Urlpart[auth]/sent-otp
//   return response.data
// }

// export const verifyOtp = async (email: string, otp: string) => {
//   const response = await authAxiosInstance.post('/verify-otp', { email, otp })
//   return response.data
// }

// export const signup = async (payload: RegisterPayload) => {
//   const response = await authAxiosInstance.post('/signup', payload)
//   return response.data
// }

// export const signin = async (payload: LoginPayload) => {
//   const response = await authAxiosInstance.post('/signin', payload)
//   return response.data
// }

// export const forgotPassword = async (email: string, role: string) => {
//   const response = await authAxiosInstance.post('/forgot-password', {
//     email,
//     role,
//   })
//   return response
// }

// export const resetPassword = async (
//   password: string,
//   token: string,
//   role: string
// ) => {
//   const response = await authAxiosInstance.post('/reset-password', {
//     password,
//     token,
//     role,
//   })
//   return response
// }

// export const logout = async () => {
//   const response = await authAxiosInstance.post('/logout')
//   return response
// }

import { axiosInstance } from '@/api/interceptor'
import { RegisterPayload, LoginPayload } from '@/lib/schemas/registerSchema'
import { AUTH_ROUTES } from '@/utils/constants/api.routes'

export const sendOtp = async (email: string) => {
  const response = await axiosInstance.post(AUTH_ROUTES.SEND_OTP, { email })
  return response.data
}

export const verifyOtp = async (email: string, otp: string) => {
  const response = await axiosInstance.post(AUTH_ROUTES.VERIFY_OTP, {
    email,
    otp,
  })
  return response.data
}

export const signup = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post(AUTH_ROUTES.SIGNUP, payload)
  return response.data
}

export const signin = async (payload: LoginPayload) => {
  const response = await axiosInstance.post(AUTH_ROUTES.SIGNIN, payload)
  return response.data
}

export const forgotPassword = async (email: string, role: string) => {
  const response = await axiosInstance.post(AUTH_ROUTES.FORGOT_PASSWORD, {
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
  const response = await axiosInstance.post(AUTH_ROUTES.RESET_PASSWORD, {
    password,
    token,
    role,
  })
  return response
}

export const logout = async () => {
  const response = await axiosInstance.post(AUTH_ROUTES.LOGOUT)
  return response
}
