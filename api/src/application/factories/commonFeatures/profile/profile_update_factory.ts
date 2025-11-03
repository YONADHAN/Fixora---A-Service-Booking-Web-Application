import { inject, injectable } from 'tsyringe'
import { IProfileUpdateFactory } from './profile_update_factory.interface'
import { ICustomerProfileUpdateStrategy } from '../../../strategies/commonFeatures/profile/customer_profile_update_strategy.interface'
import { IVendorProfileUpdateStrategy } from '../../../strategies/commonFeatures/profile/vendor_profile_update_strategy.interface'

@injectable()
export class ProfileUpdateFactory implements IProfileUpdateFactory {
  constructor(
    @inject('ICustomerProfileUpdateStrategy')
    private _customerStrategy: ICustomerProfileUpdateStrategy,
    @inject('IVendorProfileUpdateStrategy')
    private _vendorStrategy: IVendorProfileUpdateStrategy
  ) {}
  getStrategy(role: string, data: any, userId: string) {
    switch (role.toLowerCase()) {
      case 'customer':
        return this._customerStrategy.execute({ data, userId })
      case 'vendor':
        return this._vendorStrategy.execute({ data, userId })
      default:
        throw new Error(`Can't update the datas of ${role} ${userId}`)
    }
  }
}
