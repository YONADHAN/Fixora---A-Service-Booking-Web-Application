import { inject, injectable } from 'tsyringe'
import { IAdminLoginStrategy } from './admin_login_strategy.interface'
import { LoginUserDTO } from '../../../dtos/user_dto'
import { IAdminRepository } from '../../../../domain/repositoryInterfaces/users/admin_repository.interface'
import { IBcrypt } from '../../../../presentation/security/bcrypt_interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'

@injectable()
export class AdminLoginStrategy implements IAdminLoginStrategy {
  constructor(
    @inject('IAdminRepository') private _adminRepository: IAdminRepository,
    @inject('IPasswordBcrypt') private _passwordBcrypt: IBcrypt
  ) {}

  async login(user: LoginUserDTO) {
    const { email, password } = user

    const admin = await this._adminRepository.findOne({ email })

    if (!admin)
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      )
    if (!password) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      )
    }

    const isPasswordValid = await this._passwordBcrypt.compare(
      password,
      admin.password
    )

    if (!isPasswordValid)
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.FORBIDDEN
      )

    if (admin.status === 'blocked')
      throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN)

    return admin
  }
}
