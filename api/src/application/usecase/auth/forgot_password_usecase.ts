import { inject, injectable } from 'tsyringe'
import { IForgotPasswordUseCase } from '../../../domain/useCaseInterfaces/auth/forgot_password_usecase_interface'
import { IForgotPasswordStrategyFactory } from '../../factories/auth/forgot_password/forgot_password_strategy_factory.interface'
@injectable()
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    @inject('IForgotPasswordStrategyFactory')
    private strategyFactory: IForgotPasswordStrategyFactory
  ) {}

  async execute({
    email,
    role,
  }: {
    email: string
    role: string
  }): Promise<void> {
    const strategy = this.strategyFactory.getStrategy(role)
    await strategy.execute(email)
  }
}
