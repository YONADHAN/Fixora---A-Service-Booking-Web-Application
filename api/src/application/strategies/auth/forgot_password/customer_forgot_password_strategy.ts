import { inject, injectable } from 'tsyringe'
import { IForgotPasswordStrategy } from './forgot_password_strategy.interface'
import { ICustomerRepository } from '../../../../domain/repositoryInterfaces/users/customer_repository.interface'
import { IEmailService } from '../../../../domain/serviceInterfaces/email_service_interface'
import { ITokenService } from '../../../../domain/serviceInterfaces/token_service_interface'
import { IRedisTokenRepository } from '../../../../domain/repositoryInterfaces/redis/redis_token_repository_interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'

@injectable()
export class CustomerForgotPasswordStrategy implements IForgotPasswordStrategy {
  constructor(
    @inject('ICustomerRepository') private customerRepo: ICustomerRepository,
    @inject('IEmailService') private emailService: IEmailService,
    @inject('ITokenService') private tokenService: ITokenService,
    @inject('IRedisTokenRepository') private redisRepo: IRedisTokenRepository
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.customerRepo.findOne({ email })
    if (!user)
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      )

    const resetToken = this.tokenService.generateResetToken(email)
    await this.redisRepo.storeResetToken(user.userId ?? '', resetToken)

    const resetUrl = `${process.env.NEXT_FRONTEND_URL}/customer/reset-password/${resetToken}`
    await this.emailService.sendResetEmail(email, 'Reset Password', resetUrl)
  }
}
