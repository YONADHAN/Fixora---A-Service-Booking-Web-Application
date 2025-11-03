import { Request, Response } from 'express'

export interface ICustomerController {
  logout(req: Request, res: Response): Promise<void>
  profileInfo(req: Request, res: Response): any
  profileUpdate(req: Request, res: Response): Promise<void>
}
