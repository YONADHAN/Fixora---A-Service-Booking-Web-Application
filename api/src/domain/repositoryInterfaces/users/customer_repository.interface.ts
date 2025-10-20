import { ICustomerEntity } from '../../models/customer_entity'
import { IBaseRepository } from '../base_repository.interface'
export interface ICustomerRepository extends IBaseRepository<ICustomerEntity> {}
