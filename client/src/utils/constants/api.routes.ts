import { BASE_URL } from './route'

export const ADMIN_ROUTES = {
  REFRESH_TOKEN: `${BASE_URL.ADMIN}/refresh-token`,
  LOGOUT: `${BASE_URL.ADMIN}/logout`,
}

export const VENDOR_ROUTES = {
  REFRESH_TOKEN: `${BASE_URL.VENDOR}/refresh-token`,
  LOGOUT: `${BASE_URL.VENDOR}/logout`,
  GET_PROFILE_INFO: `${BASE_URL.VENDOR}/profile-info`,
  UPDATE_PROFILE_INFO: `${BASE_URL.VENDOR}/update-profile-info`,
}

export const CUSTOMER_ROUTES = {
  REFRESH_TOKEN: `${BASE_URL.CUSTOMER}/refresh-token`,
  LOGOUT: `${BASE_URL.CUSTOMER}/logout`,
  GET_PROFILE_INFO: `${BASE_URL.CUSTOMER}/profile-info`,
  UPDATE_PROFILE_INFO: `${BASE_URL.CUSTOMER}/update-profile-info`,
}

export const AUTH_ROUTES = {
  SEND_OTP: `${BASE_URL.AUTH}/send-otp`,
  VERIFY_OTP: `${BASE_URL.AUTH}/verify-otp`,
  SIGNUP: `${BASE_URL.AUTH}/signup`,
  SIGNIN: `${BASE_URL.AUTH}/signin`,
  FORGOT_PASSWORD: `${BASE_URL.AUTH}/forgot-password`,
  RESET_PASSWORD: `${BASE_URL.AUTH}/reset-password`,
  LOGOUT: `${BASE_URL.AUTH}/logout`,
}
