import { Request, Response } from 'express'
export interface IVendorController {
  uploadVerificationDocument(req: Request, res: Response): Promise<void>
  logout(req: Request, res: Response): Promise<void>
}
