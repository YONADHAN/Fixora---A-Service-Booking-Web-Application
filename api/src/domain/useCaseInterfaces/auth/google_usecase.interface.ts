import { TRole } from '../../../shared/constants'
import { ICustomerEntity } from '../../models/customer_entity'
import { IVendorEntity } from '../../models/vendor_entity'
import { IAdminEntity } from '../../models/admin_entity'

export interface IGoogleUseCase {
  execute(
    credentials: string,
    client_id: string,
    role: TRole
  ): Promise<Partial<IAdminEntity | ICustomerEntity | IVendorEntity>>
}
