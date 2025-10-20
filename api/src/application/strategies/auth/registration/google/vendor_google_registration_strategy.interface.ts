import { VendorDTO } from '../../../../dtos/user_dto'
import { IVendorEntity } from '../../../../../domain/models/vendor_entity'

export interface IVendorGoogleRegistrationStrategy {
  register(user: VendorDTO): Promise<IVendorEntity>
}
