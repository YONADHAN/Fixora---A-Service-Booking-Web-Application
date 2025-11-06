import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '../../../../../domain/repositoryInterfaces/users/customer_repository.interface'
import { CustomError } from '../../../../../domain/utils/custom.error'
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  statusTypes,
} from '../../../../../shared/constants'
import { IChangeMyCustomersBlockStatusStrategy } from './change_my_customers_block_status_strategy.interface'
import { redisClient } from '../../../../../interfaceAdapters/repositories/redis/redis.client'

@injectable()
export class ChangeMyCustomersBlockStatusStrategy
  implements IChangeMyCustomersBlockStatusStrategy
{
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository
  ) {}

  async execute(userId: string, status: string) {
    const customer = await this._customerRepository.findOne({ userId })

    if (!customer) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      )
    }

    if (status === customer.status) {
      throw new CustomError(
        ERROR_MESSAGES.STATUS_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      )
    }

    customer.status = status as statusTypes
    await this._customerRepository.update(customer._id, customer)
    if (status == 'blocked') {
      await redisClient.set(`user_block_status:customer:${userId}`, status, {
        EX: 3600,
      })
    } else if (status == 'active') {
      await redisClient.del(`user_block_status:customer:${userId}`)
    }
    return { message: `Customer ${status} successfully`, customer }
  }
}
