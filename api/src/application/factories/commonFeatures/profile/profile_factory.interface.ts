import { CustomerProfileInfoDTO } from '../../../dtos/user_dto'
import { VendorProfileInfoDTO } from '../../../dtos/user_dto'

export interface IProfileFactory {
  getProfile(
    role: string,
    userId: string
  ): Promise<CustomerProfileInfoDTO | VendorProfileInfoDTO>
}
