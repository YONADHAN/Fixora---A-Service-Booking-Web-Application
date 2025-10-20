import { LoginUserDTO } from '../../../application/dtos/user_dto'
import { IAdminEntity } from '../../models/admin_entity'
import { ICustomerEntity } from '../../models/customer_entity'
import { IVendorEntity } from '../../models/vendor_entity'

export interface ILoginUserUseCase {
  execute(
    user: LoginUserDTO
  ): Promise<Partial<ICustomerEntity | IAdminEntity | IVendorEntity>>
}
