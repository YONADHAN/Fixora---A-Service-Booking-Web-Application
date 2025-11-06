import { inject, injectable } from 'tsyringe'
import { IFetchingCustomersStrategy } from './fetching_customers_strategy.interface'
import { ICustomerRepository } from '../../../../domain/repositoryInterfaces/users/customer_repository.interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { UserMapper } from '../../../../application/mappers/admin/users.mapper'
import { GetAllUsersDTO } from '../../../../application/dtos/user_dto'

@injectable()
export class FetchingCustomersStrategy implements IFetchingCustomersStrategy {
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository
  ) {}

  async execute(
    page: number,
    limit: number,
    search: string
  ): Promise<GetAllUsersDTO[]> {
    const customers = await this._customerRepository.findAll(
      page,
      limit,
      search
    )

    if (!customers || customers.length === 0) {
      throw new CustomError(
        ERROR_MESSAGES.USERS_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      )
    }

    const mappedCustomers = UserMapper.toResponse(customers)

    return mappedCustomers
  }
}
