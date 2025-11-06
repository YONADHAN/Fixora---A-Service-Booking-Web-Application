import { GetAllUsersDTO } from '../../../application/dtos/user_dto'
export interface IGetAllUsersUseCase {
  execute({
    role,
    page,
    limit,
    search,
  }: {
    role: string
    page: number
    limit: number
    search: string
  }): Promise<GetAllUsersDTO[]>
}
