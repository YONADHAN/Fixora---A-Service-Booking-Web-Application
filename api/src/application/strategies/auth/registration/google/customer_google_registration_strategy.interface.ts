import { CustomerDTO } from '../../../../dtos/user_dto'
import { ICustomerEntity } from '../../../../../domain/models/customer_entity'

export interface ICustomerGoogleRegistrationStrategy {
  register(user: CustomerDTO): Promise<ICustomerEntity>
}
