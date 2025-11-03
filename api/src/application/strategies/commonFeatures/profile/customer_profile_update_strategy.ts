import { inject, injectable } from 'tsyringe'
import { ERROR_MESSAGES } from '../../../../shared/constants'
import { ICustomerRepository } from '../../../../domain/repositoryInterfaces/users/customer_repository.interface'
import { ICustomerProfileUpdateStrategy } from './customer_profile_update_strategy.interface'

@injectable()
export class CustomerProfileUpdateStrategy
  implements ICustomerProfileUpdateStrategy
{
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository
  ) {}

  async execute({ data, userId }: { data: any; userId: string }) {
    const res = await this._customerRepository.update({ userId }, data)

    if (!res) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND)
  }
}
