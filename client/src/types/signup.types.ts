// export interface BaseFormData {
//   username: string
//   email: string
//   password: string
//   confirmPassword: string
//   phone: string
// }

// export interface VendorFormData extends BaseFormData {
//   // idProof: string | null
// }

// export interface CustomerFormData extends BaseFormData {}

export interface SignupData {
  username: string
  email: string
  phone?: string
  password?: string
  role: 'customer' | 'vendor'
  avatar?: File | null
  zipcode?: string
  location?: {
    type: 'Point'
    coordinates: [number, number] // [lng, lat]
    name?: string
    displayName?: string
    zipCode?: string
  }
}
