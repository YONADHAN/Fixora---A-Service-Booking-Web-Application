import { inject, injectable } from 'tsyringe'
import { IVendorRepository } from '../../../../../domain/repositoryInterfaces/users/vendor_repository.interface'
import { CustomError } from '../../../../../domain/utils/custom.error'
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  statusTypes,
} from '../../../../../shared/constants'
import { IChangeMyVendorsBlockStatusStrategy } from './change_my_vendors_block_status_strategy.interface'
import { redisClient } from '../../../../../interfaceAdapters/repositories/redis/redis.client'

@injectable()
export class ChangeMyVendorsBlockStatusStrategy
  implements IChangeMyVendorsBlockStatusStrategy
{
  constructor(
    @inject('IVendorRepository')
    private _vendorRepository: IVendorRepository
  ) {}

  async execute(userId: string, status: statusTypes) {
    const vendor = await this._vendorRepository.findOne({ userId })

    if (!vendor) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      )
    }

    if (status === vendor.status) {
      throw new CustomError(
        ERROR_MESSAGES.STATUS_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      )
    }

    vendor.status = status as statusTypes
    await this._vendorRepository.update(vendor._id, vendor)
    if (status == 'blocked') {
      await redisClient.set(`user_blocking_status:customer:${userId}`, status, {
        EX: 3600,
      })
    } else if (status == 'active') {
      await redisClient.del(`user_blocking_status:customer:${userId}`)
    }
    return { message: `Vendor ${status} successfully`, vendor }
  }
}
