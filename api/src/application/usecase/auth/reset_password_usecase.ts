import { inject, injectable } from 'tsyringe'
import { ITokenService } from '../../../domain/serviceInterfaces/token_service_interface'
import { CustomError } from '../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constants'
import { IResetPasswordUseCase } from '../../../domain/useCaseInterfaces/auth/reset_password_usecase_interface'
import { IResetPasswordStrategyFactory } from '../../factories/auth/reset_password/reset_password_strategy_factory.interface'
import { TRole } from '../../../shared/constants'
@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject('IResetPasswordStrategyFactory')
    private _factory: IResetPasswordStrategyFactory,
    @inject('ITokenService')
    private _tokenService: ITokenService
  ) {}

  async execute({
    password,
    role,
    token,
  }: {
    password: string
    role: 'admin' | 'vendor' | 'customer'
    token: string
  }): Promise<void> {
    console.log('hello')
    const payload = this._tokenService.verifyResetToken(token)

    if (!payload?.email)
      throw new CustomError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.BAD_REQUEST
      )

    const strategy = this._factory.getStrategy(role)
    await strategy.resetPassword(payload.email, password, token)
  }
}
