export interface BaseFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

export interface VendorFormData extends BaseFormData {
  idProof: string | null
}

export interface CustomerFormData extends BaseFormData {}
