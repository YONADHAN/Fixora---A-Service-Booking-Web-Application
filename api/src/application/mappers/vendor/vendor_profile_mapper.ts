import { VendorProfileInfoDTO } from '../../dtos/user_dto'

export class VendorProfileMapper {
  static toDTO(customer: any): VendorProfileInfoDTO {
    return {
      userId: customer.userId,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      phone: customer.phone || '',
      status: customer.status,
      location: customer.location,
    }
  }
}
