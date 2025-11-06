import { statusTypes, TRole } from '../../shared/constants'

export interface BaseUserDTO {
  userId?: string
  name: string
  email: string
  phone?: string
  password?: string
  googleId?: string
}

export interface AdminDTO extends BaseUserDTO {
  role: 'admin'
  password: string
}

export interface CustomerDTO extends BaseUserDTO {
  role: 'customer'
}

export interface VendorDTO extends BaseUserDTO {
  role: 'vendor'
}

export type UserDTO = AdminDTO | CustomerDTO | VendorDTO

export interface LoginUserDTO {
  email: string
  password?: string
  role: TRole
}

export interface GoogleUserDTO {
  name: string
  email: string
  googleId: string
  role: 'customer' | 'vendor'
}

export interface VendorResponseDTO {
  _id: string
  name: string
  email: string
  role: string
  phone: string
}

export interface CustomerResponseDTO {
  _id: string
  name: string
  email: string
  role: string
  phone: string
}

export interface CustomerProfileInfoDTO {
  userId: string
  name: string
  email: string
  role: string
  phone: string
  status: string
  location: { name: string; displayName: string; zipCode: string }
}

export interface VendorProfileInfoDTO {
  userId: string
  name: string
  email: string
  role: string
  phone: string
  status: string
  location: { name: string; displayName: string; zipCode: string }
}

export interface GetAllUsersDTO {
  userId: string
  name: string
  email: string
  role?: string
  status: statusTypes | undefined
  // isBlocked: boolean
  createdAt: Date
  updatedAt?: Date
}
