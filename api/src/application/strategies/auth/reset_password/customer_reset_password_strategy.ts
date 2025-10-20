import { injectable, inject } from 'tsyringe'
import { ICustomerResetPasswordStrategy } from './customer_reset_password_strategy.interface'
import { ICustomerRepository } from '../../../../domain/repositoryInterfaces/users/customer_repository.interface'
import { IRedisTokenRepository } from '../../../../domain/repositoryInterfaces/redis/redis_token_repository_interface'
import { IBcrypt } from '../../../../presentation/security/bcrypt_interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'

@injectable()
export class CustomerResetPasswordStrategy
  implements ICustomerResetPasswordStrategy
{
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository,
    @inject('IPasswordBcrypt') private _bcrypt: IBcrypt,
    @inject('IRedisTokenRepository') private _redis: IRedisTokenRepository
  ) {}

  async resetPassword(
    email: string,
    newPassword: string,
    token: string
  ): Promise<void> {
    const user = await this._customerRepository.findOne({ email })
    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      )
    }
    const tokenValid = await this._redis.verifyResetToken(
      user.userId ?? '',
      token
    )
    if (!tokenValid) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.BAD_REQUEST
      )
    }
    const isSame = await this._bcrypt.compare(newPassword, user.password)
    if (isSame) {
      throw new CustomError(
        ERROR_MESSAGES.SAME_CURR_NEW_PASSWORD,
        HTTP_STATUS.BAD_REQUEST
      )
    }
    const hashedPassword = await this._bcrypt.hash(newPassword)
    await this._customerRepository.update(
      { email },
      { password: hashedPassword }
    )
  }
}
