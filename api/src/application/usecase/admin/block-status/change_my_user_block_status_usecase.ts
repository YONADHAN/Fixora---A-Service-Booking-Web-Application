import { inject, injectable } from 'tsyringe'
import { IChangeMyUserBlockStatusFactory } from '../../../factories/admin/block_status/change_my_user_block_status_factory.interface'
import { IChangeMyUserBlockStatusUseCase } from '../../../../domain/useCaseInterfaces/admin/change_my_users_block_status_usecase_interface'
import { statusTypes, TRole } from '../../../../shared/constants'

@injectable()
export class ChangeMyUserBlockStatusUseCase
  implements IChangeMyUserBlockStatusUseCase
{
  constructor(
    @inject('IChangeMyUserBlockStatusFactory')
    private _changeMyUserBlockStatusFactory: IChangeMyUserBlockStatusFactory
  ) {}

  async execute({
    role,
    userId,
    status,
  }: {
    role: TRole
    userId: string
    status: statusTypes
  }) {
    console.log('arrived usecase')
    return this._changeMyUserBlockStatusFactory.getStrategy({
      role,
      userId,
      status,
    })
  }
}
