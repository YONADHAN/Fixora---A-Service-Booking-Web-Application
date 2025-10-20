import { TRole } from '../../shared/constants'

// export interface AdminDTO {
//   userId?: string
//   name: string
//   email: string
//   password?: string
//   phone: string
//   role: 'admin'
// }

// export interface CustomerDTO {
//   userId?: string
//   name: string
//   email: string
//   phone?: string
//   password?: string
//   googleId?: string
//   role: 'customer'
// }
// export interface VendorDTO {
//   userId?: string
//   name: string
//   email: string
//   phone?: string
//   password?: string
//   googleId?: string
//   role: 'vendor'
// }
// export type UserDTO = AdminDTO | CustomerDTO | VendorDTO

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
