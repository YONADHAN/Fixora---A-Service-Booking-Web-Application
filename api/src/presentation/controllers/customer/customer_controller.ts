import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import 'reflect-metadata'
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  TRole,
} from '../../../shared/constants'
import { ICustomerController } from '../../../domain/controllerInterfaces/users/customer-controller.interface'
import { handleErrorResponse } from '../../../shared/utils/error_handler'
import { clearAuthCookies } from '../../../shared/utils/cookie_helper'
import { CustomRequest } from '../../middleware/auth_middleware'
import { IBlacklistTokenUseCase } from '../../../domain/useCaseInterfaces/auth/blacklist_token_usecase_interface'
import { IRevokeRefreshTokenUseCase } from '../../../domain/useCaseInterfaces/auth/revoke_refresh_token_usecase'
import { IGetProfileInfoUseCase } from '../../../domain/useCaseInterfaces/common/get_profile_info_usecase_interface'
import { IProfileInfoUpdateUseCase } from '../../../domain/useCaseInterfaces/common/profile_info_update_usecase_interface'
@injectable()
export class CustomerController implements ICustomerController {
  constructor(
    @inject('IBlacklistTokenUseCase')
    private _blacklistTokenUseCase: IBlacklistTokenUseCase,
    @inject('IRevokeRefreshTokenUseCase')
    private _revokeRefreshTokenUseCase: IRevokeRefreshTokenUseCase,
    @inject('IGetProfileInfoUseCase')
    private _getProfileInfoUseCase: IGetProfileInfoUseCase,
    @inject('IProfileInfoUpdateUseCase')
    private _profileInfoUpdateUseCase: IProfileInfoUpdateUseCase
  ) {}

  async logout(req: Request, res: Response): Promise<void> {
    try {
      await this._blacklistTokenUseCase.execute(
        (req as CustomRequest).user.access_token
      )
      await this._revokeRefreshTokenUseCase.execute(
        (req as CustomRequest).user.refresh_token
      )
      const user = (req as CustomRequest).user
      const accessTokenName = `${user.role}_access_token`
      const refreshTokenName = `${user.role}_refresh_token`
      clearAuthCookies(res, accessTokenName, refreshTokenName)
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }

  async profileInfo(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.userId
      const role = (req as CustomRequest).user.role
      const userData = await this._getProfileInfoUseCase.execute(role, userId)

      res.status(HTTP_STATUS.OK).json({
        message: SUCCESS_MESSAGES.PROFILE_FETCHED_SUCCESSFULLY,
        data: userData,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }

  async profileUpdate(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body
      const userId = (req as CustomRequest).user.userId
      const role = (req as CustomRequest).user.role

      await this._profileInfoUpdateUseCase.execute(role, data, userId)
      res.status(HTTP_STATUS.OK).json({
        message: SUCCESS_MESSAGES.PROFILE_UPDATED_SUCCESSFULLY,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }
}
