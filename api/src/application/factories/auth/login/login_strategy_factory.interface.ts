import { ILoginStrategy } from '../../../strategies/auth/login/login_strategy.interface'

export interface ILoginStrategyFactory {
  getStrategy(role: string): ILoginStrategy
}
