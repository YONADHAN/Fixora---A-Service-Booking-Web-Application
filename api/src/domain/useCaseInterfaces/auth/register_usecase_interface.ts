import { UserDTO } from '../../../application/dtos/user_dto'
import { ICustomerEntity } from '../../models/customer_entity'
import { IVendorEntity } from '../../models/vendor_entity'
export interface IRegisterUserUseCase {
  execute(user: UserDTO): Promise<ICustomerEntity | IVendorEntity | null>
}
