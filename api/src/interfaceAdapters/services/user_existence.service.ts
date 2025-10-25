import { inject, injectable } from 'tsyringe'

import { ICustomerRepository } from '../../domain/repositoryInterfaces/users/customer_repository.interface'
import { IUserExistenceService } from '../../domain/serviceInterfaces/user_existence_service.interface'
import { IVendorRepository } from '../../domain/repositoryInterfaces/users/vendor_repository.interface'

@injectable()
export class UserExistenceService implements IUserExistenceService {
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository,
    @inject('IVendorRepository')
    private _vendorRepository: IVendorRepository
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const [customer, vendor] = await Promise.all([
      this._customerRepository.findOne({ email }),
      this._vendorRepository.findOne({ email }),
    ])

    return Boolean(customer || vendor)
  }
}
