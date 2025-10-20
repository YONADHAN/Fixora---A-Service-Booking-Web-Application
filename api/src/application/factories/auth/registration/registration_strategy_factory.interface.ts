import { IRegistrationStrategy } from '../../../strategies/auth/registration/registration_strategy.interface'

export interface IRegistrationStrategyFactory {
  getStrategy(role: string): IRegistrationStrategy
}
