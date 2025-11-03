import { CustomerProfileInfoDTO } from '../../dtos/user_dto'

export class CustomerProfileMapper {
  static toDTO(customer: any): CustomerProfileInfoDTO {
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
