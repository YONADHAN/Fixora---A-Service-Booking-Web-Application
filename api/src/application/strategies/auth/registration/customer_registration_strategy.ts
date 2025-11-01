import { inject, injectable } from 'tsyringe'

import { UserDTO } from '../../../dtos/user_dto'
import { ICustomerEntity } from '../../../../domain/models/customer_entity'
import { ICustomerRepository } from '../../../../domain/repositoryInterfaces/users/customer_repository.interface'
import { IBcrypt } from '../../../../presentation/security/bcrypt_interface'
import { IUserExistenceService } from '../../../../domain/serviceInterfaces/user_existence_service.interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { generateUniqueId } from '../../../../shared/utils/unique_uuid.helper'
import { ICustomerRegistrationStrategy } from './customer_registration_strategy.interface'

@injectable()
export class CustomerRegistrationStrategy
  implements ICustomerRegistrationStrategy
{
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository,

    @inject('IUserExistenceService')
    private _userExistenceService: IUserExistenceService,

    @inject('IPasswordBcrypt')
    private _passwordBcrypt: IBcrypt
  ) {}
  async register(user: UserDTO): Promise<ICustomerEntity> {
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

    return await this._customerRepository.save({
      ...user,
      email: normalizedEmail,
      password: hashedPassword,
      userId,
    })
  }
}
