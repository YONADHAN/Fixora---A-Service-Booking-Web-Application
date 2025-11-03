import { inject, injectable } from 'tsyringe'

import { ICustomerProfileStrategy } from '../../../strategies/commonFeatures/profile/customer_profile_strategy.interface'
import { IVendorProfileStrategy } from '../../../strategies/commonFeatures/profile/vendor_profile_strategy.interface'
import { IProfileFactory } from './profile_factory.interface'
@injectable()
export class ProfileFactory implements IProfileFactory {
  constructor(
    @inject('ICustomerProfileStrategy')
    private _customerStrategy: ICustomerProfileStrategy,
    @inject('IVendorProfileStrategy')
    private _vendorStrategy: IVendorProfileStrategy
  ) {}

  getProfile(role: string, userId: string) {
    switch (role.toLowerCase()) {
      case 'customer':
        return this._customerStrategy.execute({ userId })
      case 'vendor':
        return this._vendorStrategy.execute({ userId })
      default:
        throw new Error(`No profile strategy found for role: ${role}`)
    }
  }
}
