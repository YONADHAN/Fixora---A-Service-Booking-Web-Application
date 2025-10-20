import { IUserEntity } from './user_entity'

export interface IVendorEntity extends IUserEntity {
  googleId?: string
  geoLocation?: {
    type?: 'Point'
    coordinates?: number[]
  }
  location?: {
    name?: string
    displayName?: string
    zipCode?: string
  }
  documents?: {
    name: string
    url: string
    verified?: boolean
    uploadedAt?: Date
  }[]
}
