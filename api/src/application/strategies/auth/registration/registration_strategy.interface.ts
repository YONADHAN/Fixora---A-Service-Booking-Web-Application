import { UserDTO } from '../../../dtos/user_dto'
import { ICustomerEntity } from '../../../../domain/models/customer_entity'
import { IAdminEntity } from '../../../../domain/models/admin_entity'
import { IVendorEntity } from '../../../../domain/models/vendor_entity'
export interface IRegistrationStrategy {
  register(
    user: UserDTO
  ): Promise<ICustomerEntity | IAdminEntity | IVendorEntity>
}
