import { inject, injectable } from 'tsyringe'
import { IForgotPasswordStrategy } from '../../../strategies/auth/forgot_password/forgot_password_strategy.interface'
import { IForgotPasswordStrategyFactory } from './forgot_password_strategy_factory.interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { HTTP_STATUS, ERROR_MESSAGES } from '../../../../shared/constants'

@injectable()
export class ForgotPasswordStrategyFactory
  implements IForgotPasswordStrategyFactory
{
  constructor(
    @inject('CustomerForgotPasswordStrategy')
    private customerStrategy: IForgotPasswordStrategy,
    @inject('VendorForgotPasswordStrategy')
    private vendorStrategy: IForgotPasswordStrategy,
    @inject('AdminForgotPasswordStrategy')
    private adminStrategy: IForgotPasswordStrategy
  ) {}

  getStrategy(role: string): IForgotPasswordStrategy {
    switch (role) {
      case 'customer':
        return this.customerStrategy
      case 'vendor':
        return this.vendorStrategy
      case 'admin':
        return this.adminStrategy
      default:
        throw new CustomError(
          ERROR_MESSAGES.INVALID_ROLE,
          HTTP_STATUS.FORBIDDEN
        )
    }
  }
}
