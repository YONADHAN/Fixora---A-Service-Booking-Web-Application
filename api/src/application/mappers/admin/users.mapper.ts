import { GetAllUsersDTO } from '../../dtos/user_dto'
import { ICustomerEntity } from '../../../domain/models/customer_entity'

export class UserMapper {
  static toResponse(users: ICustomerEntity[]): GetAllUsersDTO[] {
    return users.map((user) => ({
      userId: user.userId?.toString() ?? '',
      name: user.name ?? '',
      email: user.email ?? '',
      role: user.role ?? 'customer',
      status: user.status,
      // isBlocked: user.status === 'blocked',
      createdAt: user.createdAt ?? new Date(),
      updatedAt: user.updatedAt,
    }))
  }
}
