import { inject, injectable } from 'tsyringe'

import { ICustomerRepository } from '../../domain/repositoryInterfaces/users/customer_repository.interface'
import { IUserExistenceService } from '../../domain/serviceInterfaces/user_existence_service.interface'
@injectable()
export class UserExistenceService implements IUserExistenceService {
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const [customer] = await Promise.all([
      this._customerRepository.findOne({ email }),
    ])
    return Boolean(customer)
  }
}
