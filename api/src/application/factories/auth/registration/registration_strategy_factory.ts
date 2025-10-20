import { inject, injectable } from 'tsyringe'
import { IRegistrationStrategy } from '../../../strategies/auth/registration/registration_strategy.interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { IRegistrationStrategyFactory } from './registration_strategy_factory.interface'
import { ICustomerRegistrationStrategy } from '../../../strategies/auth/registration/customer_registration_strategy.interface'
import { IAdminRegistrationStrategy } from '../../../strategies/auth/registration/admin_registration_strategy.interface'
import { IVendorRegistrationStrategy } from '../../../strategies/auth/registration/vendor_registration_strategy.interface'

@injectable()
export class RegistrationStrategyFactory
  implements IRegistrationStrategyFactory
{
  constructor(
    @inject('ICustomerRegistrationStrategy')
    private _customerRegistration: ICustomerRegistrationStrategy,

    @inject('IAdminRegistrationStrategy')
    private _adminRegistration: IAdminRegistrationStrategy,

    @inject('IVendorRegistrationStrategy')
    private _vendorRegistration: IVendorRegistrationStrategy
  ) {}

  getStrategy(role: string): IRegistrationStrategy {
    switch (role) {
      case 'customer':
        return this._customerRegistration
      case 'admin':
        return this._adminRegistration
      case 'vendor':
        return this._vendorRegistration
      default:
        throw new CustomError(
          ERROR_MESSAGES.INVALID_ROLE,
          HTTP_STATUS.BAD_REQUEST
        )
    }
  }
}
