import { inject, injectable } from 'tsyringe'

import { IGetAllUsersFactory } from '../../factories/commonFeatures/users/get_all_users_factory.interface'
import { IGetAllUsersUseCase } from '../../../domain/useCaseInterfaces/common/get_all_users_usecase_interface'

@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(
    @inject('IGetAllUsersFactory')
    private _getAllUsersFactory: IGetAllUsersFactory
  ) {}

  async execute({
    role,
    page,
    limit,
    search,
  }: {
    role: string
    page: number
    limit: number
    search: string
  }) {
    return await this._getAllUsersFactory.getStrategy(role, page, limit, search)
  }
}
