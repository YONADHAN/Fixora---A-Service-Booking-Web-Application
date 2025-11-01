import { Request, Response } from 'express'

export interface ICustomerController {
  logout(req: Request, res: Response): Promise<void>
}
