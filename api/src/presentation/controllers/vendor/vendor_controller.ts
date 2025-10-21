import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import { ICloudinaryService } from '../../../domain/serviceInterfaces/cloudinary_service_interface'
import {
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from '../../../shared/constants'
import { handleErrorResponse } from '../../../shared/utils/error_handler'

@injectable()
export class VendorController {
  constructor(
    @inject('ICloudinaryService')
    private _cloudinaryService: ICloudinaryService
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
}
