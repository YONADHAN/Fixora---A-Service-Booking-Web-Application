import { inject, injectable } from 'tsyringe'
import { ICustomerLoginStrategy } from './customer_login_strategy.interface'
import { LoginUserDTO } from '../../../dtos/user_dto'
import { ICustomerRepository } from '../../../../domain/repositoryInterfaces/users/customer_repository.interface'
import { IBcrypt } from '../../../../presentation/security/bcrypt_interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'

@injectable()
export class CustomerLoginStrategy implements ICustomerLoginStrategy {
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository,

    @inject('IPasswordBcrypt')
    private _passwordBcrypt: IBcrypt
  ) {}

  async login(user: LoginUserDTO) {
    const { email, password } = user
    const customer = await this._customerRepository.findOne({ email })

    if (!customer)
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
      customer.password
    )

    if (!isPasswordValid)
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.FORBIDDEN
      )

    if (customer.status === 'blocked')
      throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN)

    return customer
  }
}
