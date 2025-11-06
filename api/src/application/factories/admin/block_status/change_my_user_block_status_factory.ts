import { inject, injectable } from 'tsyringe'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { IChangeMyUserBlockStatusFactory } from './change_my_user_block_status_factory.interface'
import { TRole, statusTypes } from '../../../../shared/constants'
import { IChangeMyCustomersBlockStatusStrategy } from '../../../strategies/commonFeatures/users/block_status/change_my_customers_block_status_strategy.interface'
import { IChangeMyVendorsBlockStatusStrategy } from '../../../strategies/commonFeatures/users/block_status/change_my_vendors_block_status_strategy.interface'

@injectable()
export class ChangeMyUserBlockStatusFactory
  implements IChangeMyUserBlockStatusFactory
{
  constructor(
    @inject('IChangeMyCustomersBlockStatusStrategy')
    private _changeMyCustomersBlockStatusStrategy: IChangeMyCustomersBlockStatusStrategy,

    @inject('IChangeMyVendorsBlockStatusStrategy')
    private _changeMyVendorsBlockStatusStrategy: IChangeMyVendorsBlockStatusStrategy
  ) {}

  async getStrategy({
    role,
    userId,
    status,
  }: {
    role: TRole
    userId: string
    status: statusTypes
  }) {
    console.log('arived factory')
    switch (role) {
      case 'customer':
        return this._changeMyCustomersBlockStatusStrategy.execute(
          userId,
          status
        )

      case 'vendor':
        return this._changeMyVendorsBlockStatusStrategy.execute(userId, status)

      default:
        throw new CustomError(
          ERROR_MESSAGES.INVALID_ROLE,
          HTTP_STATUS.BAD_REQUEST
        )
    }
  }
}
