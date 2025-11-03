import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '../../../../domain/repositoryInterfaces/users/customer_repository.interface'
import { CustomerProfileMapper } from '../../../mappers/customer/customer_profile_mapper'
import { ERROR_MESSAGES } from '../../../../shared/constants'
import { ICustomerProfileStrategy } from './customer_profile_strategy.interface'

@injectable()
export class CustomerProfileStrategy implements ICustomerProfileStrategy {
  constructor(
    @inject('ICustomerRepository')
    private _CustomerRepository: ICustomerRepository
  ) {}

  async execute({ userId }: { userId: string }) {
    const data = await this._CustomerRepository.findOne({ userId })
    if (!data) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND)
    return CustomerProfileMapper.toDTO(data)
  }
}
