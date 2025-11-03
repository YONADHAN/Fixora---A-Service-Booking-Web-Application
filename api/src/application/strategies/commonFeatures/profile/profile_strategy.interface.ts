import {
  CustomerProfileInfoDTO,
  VendorProfileInfoDTO,
} from '../../../dtos/user_dto'

export interface IProfileStrategy {
  execute(params: {
    userId: string
  }): Promise<CustomerProfileInfoDTO | VendorProfileInfoDTO>
}
