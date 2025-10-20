import { inject, injectable } from 'tsyringe'
import { IVendorGoogleRegistrationStrategy } from './vendor_google_registration_strategy.interface'
import { VendorDTO } from '../../../../dtos/user_dto'
import { IVendorEntity } from '../../../../../domain/models/vendor_entity'
import { IVendorRepository } from '../../../../../domain/repositoryInterfaces/users/vendor_repository.interface'
import { generateUniqueId } from '../../../../../shared/utils/unique_uuid.helper'

@injectable()
export class VendorGoogleRegistrationStrategy
  implements IVendorGoogleRegistrationStrategy
{
  constructor(
    @inject('IVendorRepository') private _vendorRepo: IVendorRepository
  ) {}

  async register(user: VendorDTO): Promise<IVendorEntity> {
    const existingUser = await this._vendorRepo.findOne({ email: user.email })
    if (existingUser) {
      return existingUser
    }

    const newUser: Partial<IVendorEntity> = {
      userId: generateUniqueId(),
      name: user.name,
      email: user.email,
      googleId: user.googleId,
      role: 'vendor',
      status: 'active',
      phone: user.phone || '',
      password: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return this._vendorRepo.save(newUser)
  }
}
