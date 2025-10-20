import type { LocationData } from './location.type'
export type UserRoles = 'admin' | 'vendor' | 'client'
export type VendorStatus = 'pending' | 'approved' | 'rejected' | 'blocked'
export type CustomerStatus = 'active' | 'blocked'
export type AdminStatus = 'active'

export interface User {
  _id?: string
  username: string
  email: string
  password: string
  phone: string
  role?: UserRoles
  avatar?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IAdmin extends User {
  status?: AdminStatus
}

export interface ICustomer extends User {
  googleId?: string
  status?: CustomerStatus
  location?: LocationData | null
}

export interface IVendor extends User {
  googleId?: string
  status?: VendorStatus
  location?: LocationData | null
}

export interface ILoginData {
  email: string
  password: string
  role: UserRoles
}

export type UserDTO = IAdmin | ICustomer | IVendor
