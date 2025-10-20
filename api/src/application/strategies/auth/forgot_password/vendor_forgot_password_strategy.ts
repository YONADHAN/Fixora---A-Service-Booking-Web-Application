import { inject, injectable } from 'tsyringe'
import { IForgotPasswordStrategy } from './forgot_password_strategy.interface'
import { IVendorRepository } from '../../../../domain/repositoryInterfaces/users/vendor_repository.interface'

import { IEmailService } from '../../../../domain/serviceInterfaces/email_service_interface'
import { ITokenService } from '../../../../domain/serviceInterfaces/token_service_interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { IRedisTokenRepository } from '../../../../domain/repositoryInterfaces/redis/redis_token_repository_interface'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
@injectable()
export class VendorForgotPasswordStrategy implements IForgotPasswordStrategy {
  constructor(
    @inject('IVendorRepository') private repo: IVendorRepository,
    @inject('IEmailService') private emailService: IEmailService,
    @inject('ITokenService') private tokenService: ITokenService,
    @inject('IRedisTokenRepository') private redisRepo: IRedisTokenRepository
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.repo.findOne({ email })
    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      )
    }

    const resetToken = this.tokenService.generateResetToken(email)
    await this.redisRepo.storeResetToken(user.userId ?? '', resetToken)

    const resetUrl = `${process.env.NEXT_FRONTEND_URL}/vendor/reset-password/${resetToken}`
    await this.emailService.sendResetEmail(
      email,
      'Fixora - Reset Password',
      resetUrl
    )
  }
}
