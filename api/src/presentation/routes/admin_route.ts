import { adminController, authController } from '../di/resolver'
import { BaseRoute } from './base_route'
import { Request, Response } from 'express'
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from '../middleware/auth_middleware'
export class AdminRoutes extends BaseRoute {
  constructor() {
    super()
  }

  protected initializeRoutes(): void {
    this.router.post(
      '/logout',
      verifyAuth,
      authorizeRole(['admin']),
      (req: Request, res: Response) => {
        adminController.logout(req, res)
      }
    )

    this.router.post(
      '/refresh-token',
      decodeToken,
      (req: Request, res: Response) => {
        authController.handleTokenRefresh(req, res)
      }
    )
  }
}
