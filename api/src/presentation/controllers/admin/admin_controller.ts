import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import {
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from '../../../shared/constants'
import { handleErrorResponse } from '../../../shared/utils/error_handler'
import { IBlacklistTokenUseCase } from '../../../domain/useCaseInterfaces/auth/blacklist_token_usecase_interface'
import { IRevokeRefreshTokenUseCase } from '../../../domain/useCaseInterfaces/auth/revoke_refresh_token_usecase'
import { CustomRequest } from '../../middleware/auth_middleware'
import { clearAuthCookies } from '../../../shared/utils/cookie_helper'
import { IAdminController } from '../../../domain/controllerInterfaces/users/admin-controller.interface'

@injectable()
export class AdminController implements IAdminController {
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
