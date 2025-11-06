import { authController, customerController } from '../di/resolver'
import { blockMyUserMiddleware } from '../di/resolver'
import { RequestHandler } from 'express'
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from '../middleware/auth_middleware'
import { BaseRoute } from './base_route'
import { Request, Response } from 'express'

export class CustomerRoutes extends BaseRoute {
  constructor() {
    super()
  }

  protected initializeRoutes(): void {
    this.router.post(
      '/logout',
      verifyAuth,
      authorizeRole(['customer']),
      (req: Request, res: Response) => {
        customerController.logout(req, res)
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
      blockMyUserMiddleware.checkMyUserBlockStatus as RequestHandler,
      authorizeRole(['customer']),

      (req: Request, res: Response) => {
        customerController.profileInfo(req, res)
      }
    )

    this.router.patch(
      '/update-profile-info',
      verifyAuth,
      authorizeRole(['customer']),
      (req: Request, res: Response) => {
        customerController.profileUpdate(req, res)
      }
    )
  }
}
