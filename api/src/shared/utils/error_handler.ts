import { ZodError } from 'zod'
import { Request, Response } from 'express'
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants'
import { CustomError } from '../../domain/utils/custom.error'
import logger from './error.logger'

export const handleErrorResponse = (
  req: Request,
  res: Response,
  error: unknown
) => {
  logger.error(`[${req.method}] ${req.url} - ${(error as Error).message}`, {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    stack: (error as Error).stack,
  })

  if (error instanceof ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: ERROR_MESSAGES.VALIDATION_ERROR,
    })
  }

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGES.SERVER_ERROR,
  })
}
