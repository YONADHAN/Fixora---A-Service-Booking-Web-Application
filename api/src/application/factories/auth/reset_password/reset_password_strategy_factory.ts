import { injectable, inject } from 'tsyringe'

import { IResetPasswordStrategy } from '../../../strategies/auth/reset_password/reset_password_strategy.interface'
import { IAdminResetPasswordStrategy } from '../../../strategies/auth/reset_password/admin_reset_password_strategy.interface'
import { IVendorResetPasswordStrategy } from '../../../strategies/auth/reset_password/vendor_reset_password_strategy.interface'
import { ICustomerResetPasswordStrategy } from '../../../strategies/auth/reset_password/customer_reset_password_strategy.interface'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { CustomError } from '../../../../domain/utils/custom.error'
import { IResetPasswordStrategyFactory } from './reset_password_strategy_factory.interface'

@injectable()
export class ResetPasswordStrategyFactory
  implements IResetPasswordStrategyFactory
{
  constructor(
    @inject('IAdminResetPasswordStrategy')
    private _adminResetPassword: IAdminResetPasswordStrategy,

    @inject('IVendorResetPasswordStrategy')
    private _vendorResetPassword: IVendorResetPasswordStrategy,

    @inject('ICustomerResetPasswordStrategy')
    private _customerResetPassword: ICustomerResetPasswordStrategy
  ) {}

  getStrategy(role: string): IResetPasswordStrategy {
    switch (role) {
      case 'admin':
        return this._adminResetPassword
      case 'vendor':
        return this._vendorResetPassword
      case 'customer':
        return this._customerResetPassword
      default:
        throw new CustomError(
          ERROR_MESSAGES.INVALID_ROLE,
          HTTP_STATUS.BAD_REQUEST
        )
    }
  }
}
