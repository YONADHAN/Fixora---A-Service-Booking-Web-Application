export interface ApiResponse {
  success: boolean
  message: string
  data?: any
}
export interface signinData {
  email: string
  password: string
  role: string
}
export interface SignupData {
  username: string
  email: string
  phone: string
  password: string
  role: string
}

export type CustomerStatus = 'active' | 'blocked'
export type VendorStatus = 'pending' | 'approved' | 'rejected' | 'blocked'

interface CustomerData {
  _id: string
  username: string
  email: string
  phone: string
  status: CustomerStatus
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

interface VendorData {
  _id: string
  username: string
  email: string
  phone: string
  status: VendorStatus
  avatar?: string
  createdAt?: string
  updatedAt?: string
}
