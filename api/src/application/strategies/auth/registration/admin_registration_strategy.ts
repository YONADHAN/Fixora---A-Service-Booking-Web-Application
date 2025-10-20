import { inject, injectable } from 'tsyringe'

import { UserDTO } from '../../../dtos/user_dto'
import { IAdminEntity } from '../../../../domain/models/admin_entity'
import { IAdminRepository } from '../../../../domain/repositoryInterfaces/users/admin_repository.interface'
import { IBcrypt } from '../../../../presentation/security/bcrypt_interface'
import { IUserExistenceService } from '../../../../domain/serviceInterfaces/user_existence_service.interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { generateUniqueId } from '../../../../shared/utils/unique_uuid.helper'
import { IAdminRegistrationStrategy } from './admin_registration_strategy.interface'

@injectable()
export class AdminRegistrationStrategy implements IAdminRegistrationStrategy {
  constructor(
    @inject('IAdminRepository')
    private _adminRepository: IAdminRepository,

    @inject('IUserExistenceService')
    private _userExistenceService: IUserExistenceService,

    @inject('IPasswordBcrypt')
    private _passwordBcrypt: IBcrypt
  ) {}

  async register(user: UserDTO): Promise<IAdminEntity> {
    const { email, password } = user

    const isEmailExisting = await this._userExistenceService.emailExists(email)
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

    return await this._adminRepository.save({
      ...user,
      password: hashedPassword,
      userId,
      status: 'active',
    })
  }
}
