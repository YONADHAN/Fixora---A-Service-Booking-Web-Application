import { authController, vendorController } from '../di/resolver'
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from '../middleware/auth_middleware'
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

    this.router.post(
      '/logout',
      verifyAuth,
      authorizeRole(['vendor']),
      (req: Request, res: Response) => {
        vendorController.logout(req, res)
      }
    )

    this.router.post(
      '/refresh-token',
      decodeToken,
      (req: Request, res: Response) => {
        authController.handleTokenRefresh(req, res)
      }
    )

    this.router.get(
      '/profile-info',
      verifyAuth,
      authorizeRole(['vendor']),
      (req: Request, res: Response) => {
        vendorController.profileInfo(req, res)
      }
    )

    this.router.patch(
      '/update-profile-info',
      verifyAuth,
      authorizeRole(['vendor']),
      (req: Request, res: Response) => {
        vendorController.profileUpdate(req, res)
      }
    )
  }
}
