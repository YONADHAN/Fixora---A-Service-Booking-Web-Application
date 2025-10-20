import { inject, injectable } from 'tsyringe'
import { IVendorLoginStrategy } from './vendor_login_strategy.interface'
import { LoginUserDTO } from '../../../dtos/user_dto'
import { IVendorRepository } from '../../../../domain/repositoryInterfaces/users/vendor_repository.interface'
import { IBcrypt } from '../../../../presentation/security/bcrypt_interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'

@injectable()
export class VendorLoginStrategy implements IVendorLoginStrategy {
  constructor(
    @inject('IVendorRepository')
    private _vendorRepository: IVendorRepository,

    @inject('IPasswordBcrypt')
    private _passwordBcrypt: IBcrypt
  ) {}

  async login(user: LoginUserDTO) {
    const { email, password } = user
    const vendor = await this._vendorRepository.findOne({ email })

    if (!vendor)
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
      vendor.password
    )

    if (!isPasswordValid)
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.FORBIDDEN
      )

    if (vendor.status === 'blocked')
      throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN)

    return vendor
  }
}
