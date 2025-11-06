import { GetAllUsersDTO } from '../../../../application/dtos/user_dto'

export interface IFetchingCustomersStrategy {
  execute(
    page: number,
    limit: number,
    search: string
  ): Promise<GetAllUsersDTO[]>
}
