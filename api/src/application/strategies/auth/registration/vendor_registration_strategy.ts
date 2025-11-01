import { inject, injectable } from 'tsyringe'
import { UserDTO } from '../../../dtos/user_dto'
import { IVendorEntity } from '../../../../domain/models/vendor_entity'
import { IVendorRepository } from '../../../../domain/repositoryInterfaces/users/vendor_repository.interface'
import { IBcrypt } from '../../../../presentation/security/bcrypt_interface'
import { IUserExistenceService } from '../../../../domain/serviceInterfaces/user_existence_service.interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { generateUniqueId } from '../../../../shared/utils/unique_uuid.helper'
import { IVendorRegistrationStrategy } from './vendor_registration_strategy.interface'

@injectable()
export class VendorRegistrationStrategy implements IVendorRegistrationStrategy {
  constructor(
    @inject('IVendorRepository')
    private _vendorRepository: IVendorRepository,

    @inject('IUserExistenceService')
    private _userExistenceService: IUserExistenceService,

    @inject('IPasswordBcrypt')
    private _passwordBcrypt: IBcrypt
  ) {}

  async register(user: UserDTO): Promise<IVendorEntity> {
    const { email, password } = user
    const normalizedEmail = email.toLowerCase()
    const isEmailExisting = await this._userExistenceService.emailExists(
      normalizedEmail
    )
    if (isEmailExisting) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT)
    }

    if (!password) {
      throw new CustomError(
        ERROR_MESSAGES.PASSWORD_REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      )
    }
    const hashedPassword = await this._passwordBcrypt.hash(password)

    const userId = generateUniqueId()

    return await this._vendorRepository.save({
      ...user,
      userId,
      email: normalizedEmail,
      password: hashedPassword,
      role: 'vendor',
      status: 'active',
      documents: [],
    })
  }
}
