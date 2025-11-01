import { customerController } from '../di/resolver'
import { BaseRoute } from './base_route'
import { Request, Response } from 'express'

export class CustomerRoutes extends BaseRoute {
  constructor() {
    super()
  }

  protected initializeRoutes(): void {
    this.router.post('/logout', (req: Request, res: Response) => {
      customerController.logout(req, res)
    })
  }
}
