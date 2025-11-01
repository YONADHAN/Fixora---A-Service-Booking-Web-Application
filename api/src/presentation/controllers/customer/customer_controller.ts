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

@injectable()
export class CustomerController implements ICustomerController {
  constructor(
    @inject('IBlacklistTokenUseCase')
    private _blacklistTokenUseCase: IBlacklistTokenUseCase,
    @inject('IRevokeRefreshTokenUseCase')
    private _revokeRefreshTokenUseCase: IRevokeRefreshTokenUseCase
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
}
