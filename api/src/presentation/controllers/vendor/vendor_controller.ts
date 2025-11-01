import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import { ICloudinaryService } from '../../../domain/serviceInterfaces/cloudinary_service_interface'
import {
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from '../../../shared/constants'
import { handleErrorResponse } from '../../../shared/utils/error_handler'
import { CustomRequest } from '../../middleware/auth_middleware'
import { clearAuthCookies } from '../../../shared/utils/cookie_helper'
import { IBlacklistTokenUseCase } from '../../../domain/useCaseInterfaces/auth/blacklist_token_usecase_interface'
import { IRevokeRefreshTokenUseCase } from '../../../domain/useCaseInterfaces/auth/revoke_refresh_token_usecase'
import { IVendorController } from '../../../domain/controllerInterfaces/users/vendor-controller.interface'

@injectable()
export class VendorController implements IVendorController {
  constructor(
    @inject('ICloudinaryService')
    private _cloudinaryService: ICloudinaryService,
    @inject('IBlacklistTokenUseCase')
    private _blacklistTokenUseCase: IBlacklistTokenUseCase,
    @inject('IRevokeRefreshTokenUseCase')
    private _revokeRefreshTokenUseCase: IRevokeRefreshTokenUseCase
  ) {}
  //controller for the vendor for uploading the identity proof
  async uploadVerificationDocument(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file
      const folder = req.query.folder || 'vendor_docs'

      if (!file) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.FILE_NOT_FOUND,
        })
        return
      }

      const result = await this._cloudinaryService.uploadDocument(
        file.path,
        folder as string
      )

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.FILE_UPLOAD_SUCCESS,
        data: result,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }

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
