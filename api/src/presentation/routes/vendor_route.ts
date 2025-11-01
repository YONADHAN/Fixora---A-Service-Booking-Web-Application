import { vendorController } from '../di/resolver'
import { BaseRoute } from './base_route'
import { Request, Response } from 'express'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

export class VendorRoutes extends BaseRoute {
  constructor() {
    super()
  }

  protected initializeRoutes(): void {
    this.router.post(
      '/upload_verification_document',
      upload.single('file'),
      (req: Request, res: Response) => {
        vendorController.uploadVerificationDocument(req, res)
      }
    )

    this.router.post('/logout', (req: Request, res: Response) => {
      vendorController.logout(req, res)
    })
  }
}
