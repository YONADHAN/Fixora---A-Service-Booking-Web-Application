import { GetAllUsersDTO } from '../../../../application/dtos/user_dto'

export interface IFetchingVendorsStrategy {
  execute(
    page: number,
    limit: number,
    search: string
  ): Promise<GetAllUsersDTO[]>
}
