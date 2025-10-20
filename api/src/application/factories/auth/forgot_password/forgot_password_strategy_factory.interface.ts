import { IForgotPasswordStrategy } from '../../../strategies/auth/forgot_password/forgot_password_strategy.interface'
export interface IForgotPasswordStrategyFactory {
  getStrategy(role: string): IForgotPasswordStrategy
}
