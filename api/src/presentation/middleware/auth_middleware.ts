//*                  🛠️ VerifyAuth Middleware

import { NextFunction, Request, Response } from 'express'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constants'
import { JwtPayload } from 'jsonwebtoken'
import { JWTService } from '../../interfaceAdapters/services/jwt_service'
import { handleErrorResponse } from '../../shared/utils/error_handler'

const tokenService = new JWTService()

export interface CustomJwtPayload extends JwtPayload {
  userId: string
  email: string
  role: string
  access_token: string
  refresh_token: string
}

export interface CustomRequest extends Request {
  user: CustomJwtPayload
}

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req)
    console.log('token', token)
    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
      })
      return
    }
    const user = tokenService.verifyAccessToken(
      token.access_token
    ) as CustomJwtPayload
    if (!user || !user.userId) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.TOKEN_EXPIRED,
      })
      return
    }
    ;(req as CustomRequest).user = {
      ...user,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    }
    next()
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.TOKEN_EXPIRED,
      })
      return
    }
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: ERROR_MESSAGES.INVALID_TOKEN,
    })
    return
  }
}

//*                 🛠️ Extract Token Helper Fn

const extractToken = (
  req: Request
): { access_token: string; refresh_token: string } | null => {
  //   const userType = req.path.split("/")[1];
  //   console.log('userTypee',userType)

  //   if (!userType) return null;

  return {
    access_token: req.cookies?.[`access_token`] ?? null,
    refresh_token: req.cookies?.[`refresh_token`] ?? null,
  }
}

//*                 🛠️ Authorize Role Middleware

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: ERROR_MESSAGES.NOT_ALLOWED,
        userRole: user ? user.role : 'none',
      })
      return
    }
    next()
  }
}

//*                 🛠️ Decode Token Middleware

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req)

    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
      })
      return
    }

    const user = tokenService.decodeAccessToken(token?.access_token)

    ;(req as CustomRequest).user = {
      userId: user?.userId,
      email: user?.email,
      role: user?.role,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    }
    next()
  } catch {}
}
