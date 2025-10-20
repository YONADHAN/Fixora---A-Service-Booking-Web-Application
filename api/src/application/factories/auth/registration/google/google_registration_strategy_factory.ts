import { inject, injectable } from 'tsyringe'
import { ICustomerGoogleRegistrationStrategy } from '../../../../strategies/auth/registration/google/customer_google_registration_strategy.interface'
import { IVendorGoogleRegistrationStrategy } from '../../../../strategies/auth/registration/google/vendor_google_registration_strategy.interface'
import { CustomError } from '../../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../../shared/constants'

export interface IGoogleRegistrationStrategyFactory {
  getStrategy(
    role: string
  ): ICustomerGoogleRegistrationStrategy | IVendorGoogleRegistrationStrategy
}

@injectable()
export class GoogleRegistrationStrategyFactory
  implements IGoogleRegistrationStrategyFactory
{
  constructor(
    @inject('ICustomerGoogleRegistrationStrategy')
    private _customerGoogleRegistration: ICustomerGoogleRegistrationStrategy,

    @inject('IVendorGoogleRegistrationStrategy')
    private _vendorGoogleRegistration: IVendorGoogleRegistrationStrategy
  ) {}

  getStrategy(role: string) {
    switch (role) {
      case 'customer':
        return this._customerGoogleRegistration
      case 'vendor':
        return this._vendorGoogleRegistration
      default:
        throw new CustomError(
          ERROR_MESSAGES.INVALID_ROLE,
          HTTP_STATUS.BAD_REQUEST
        )
    }
  }
}
