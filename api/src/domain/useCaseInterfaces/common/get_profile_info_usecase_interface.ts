import { CustomerProfileInfoDTO } from '../../../application/dtos/user_dto'

export interface IGetProfileInfoUseCase {
  execute(role: string, userId: string): Promise<CustomerProfileInfoDTO>
}
