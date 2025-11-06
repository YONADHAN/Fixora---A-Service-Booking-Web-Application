import { ICustomerRepository } from '../../domain/repositoryInterfaces/users/customer_repository.interface'
import { IVendorRepository } from '../../domain/repositoryInterfaces/users/vendor_repository.interface'
import { redisClient } from '../../interfaceAdapters/repositories/redis/redis.client'
import { CustomRequest } from './auth_middleware'
import { IRevokeRefreshTokenUseCase } from '../../domain/useCaseInterfaces/auth/revoke_refresh_token_usecase'
import { IBlacklistTokenUseCase } from '../../domain/useCaseInterfaces/auth/blacklist_token_usecase_interface'
import { inject, injectable } from 'tsyringe'
import { clearAuthCookies } from '../../shared/utils/cookie_helper'
import { NextFunction, Response } from 'express'
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  statusTypes,
} from '../../shared/constants'

export interface IBlockMyUserMiddleware {
  checkMyUserBlockStatus(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void>
}
@injectable()
export class BlockMyUserMiddleware implements IBlockMyUserMiddleware {
  constructor(
    @inject('ICustomerRepository')
    private _customerRepository: ICustomerRepository,
    @inject('IVendorRepository')
    private _vendorRepository: IVendorRepository,
    @inject('IRevokeRefreshTokenUseCase')
    private _revokeRefreshTokenUsecase: IRevokeRefreshTokenUseCase,
    @inject('IBlacklistTokenUseCase')
    private _blacklistTokenUsecase: IBlacklistTokenUseCase
  ) {}

  checkMyUserBlockStatus = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = req.user
      if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: ERROR_MESSAGES.USER_NOT_FOUND,
        })
        return
      }

      const { userId, role } = req.user
      const cacheKey = `user_block_status:${role}:${userId}`
      let status = await redisClient.get(cacheKey)
      console.log('status from the redis', status)

      if (!status) {
        if (role === 'customer') {
          const customer = await this._customerRepository.findOne({ userId })
          if (!customer) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
              success: false,
              message: ERROR_MESSAGES.USER_NOT_FOUND,
            })
            return
          }
          status = customer.status || ''
        } else if (role === 'vendor') {
          const vendor = await this._vendorRepository.findOne({ userId })
          if (!vendor) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
              success: false,
              message: ERROR_MESSAGES.USERS_NOT_FOUND,
            })
            return
          }
          status = (vendor.status as string) || ''
        } else {
          res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: ERROR_MESSAGES.INVALID_ROLE,
          })
          return
        }

        await redisClient.set(cacheKey, status ?? 'null', { EX: 3600 })
      }

      if (status !== 'active') {
        try {
          await this._blacklistTokenUsecase.execute(req.user.access_token)
          await this._revokeRefreshTokenUsecase.execute(req.user.refresh_token)
        } catch (err) {
          console.warn('Token revoke or blacklist failed:', err)
        }

        const accessTokenName = `${role}_access_token`
        const refreshTokenName = `${role}_refresh_token`

        clearAuthCookies(res, accessTokenName, refreshTokenName)
        console.log('The message sended to interceptor forbidden and blocked')

        res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: ERROR_MESSAGES.BLOCKED,
        })
        return
      }

      next()
    } catch (error) {
      console.log('error in block status middleware', error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.SERVER_ERROR,
      })
    }
  }
}
