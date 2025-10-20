import { injectable } from 'tsyringe'
import { BaseRepository } from '../base_repository'
import {
  CustomerModel,
  ICustomerModel,
} from '../../database/mongoDb/models/customer_model'
import { ICustomerRepository } from '../../../domain/repositoryInterfaces/users/customer_repository.interface'

@injectable()
export class CustomerRepository
  extends BaseRepository<ICustomerModel>
  implements ICustomerRepository
{
  constructor() {
    super(CustomerModel)
  }
}
