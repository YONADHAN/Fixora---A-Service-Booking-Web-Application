import { inject, injectable } from 'tsyringe'
import { ILoginStrategyFactory } from './login_strategy_factory.interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { ILoginStrategy } from '../../../strategies/auth/login/login_strategy.interface'
import { IAdminLoginStrategy } from '../../../strategies/auth/login/admin_login_strategy.interface'
import { ICustomerLoginStrategy } from '../../../strategies/auth/login/customer_login_strategy.interface'
import { IVendorLoginStrategy } from '../../../strategies/auth/login/vendor_login_strategy.interface'

@injectable()
export class LoginStrategyFactory implements ILoginStrategyFactory {
  constructor(
    @inject('IAdminLoginStrategy') private _adminLogin: IAdminLoginStrategy,
    @inject('ICustomerLoginStrategy')
    private _customerLogin: ICustomerLoginStrategy,
    @inject('IVendorLoginStrategy') private _vendorLogin: IVendorLoginStrategy
  ) {}

  getStrategy(role: string): ILoginStrategy {
    switch (role) {
      case 'admin':
        return this._adminLogin
      case 'customer':
        return this._customerLogin
      case 'vendor':
        return this._vendorLogin
      default:
        throw new CustomError(
          ERROR_MESSAGES.INVALID_ROLE,
          HTTP_STATUS.BAD_REQUEST
        )
    }
  }
}
