import { IResetPasswordStrategy } from '../../../strategies/auth/reset_password/reset_password_strategy.interface'
import { IAdminResetPasswordStrategy } from '../../../strategies/auth/reset_password/admin_reset_password_strategy.interface'
import { IVendorResetPasswordStrategy } from '../../../strategies/auth/reset_password/vendor_reset_password_strategy.interface'
import { ICustomerResetPasswordStrategy } from '../../../strategies/auth/reset_password/customer_reset_password_strategy.interface'

export interface IResetPasswordStrategyFactory {
  getStrategy(
    role: 'admin' | 'vendor' | 'customer'
  ):
    | IAdminResetPasswordStrategy
    | IVendorResetPasswordStrategy
    | ICustomerResetPasswordStrategy
    | IResetPasswordStrategy
}
