// //*                  🛠️ VerifyAuth Middleware

// import { NextFunction, Request, Response } from 'express'
// import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constants'
// import { JwtPayload } from 'jsonwebtoken'
// import { JWTService } from '../../interfaceAdapters/services/jwt_service'
// import { handleErrorResponse } from '../../shared/utils/error_handler'

// const tokenService = new JWTService()

// export interface CustomJwtPayload extends JwtPayload {
//   userId: string
//   email: string
//   role: string
//   access_token: string
//   refresh_token: string
// }

// export interface CustomRequest extends Request {
//   user: CustomJwtPayload
// }

// export const verifyAuth = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = extractToken(req)
//     console.log('token', token)
//     if (!token) {
//       res.status(HTTP_STATUS.UNAUTHORIZED).json({
//         success: false,
//         message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
//       })
//       return
//     }
//     const user = tokenService.verifyAccessToken(
//       token.access_token
//     ) as CustomJwtPayload
//     if (!user || !user.userId) {
//       res.status(HTTP_STATUS.UNAUTHORIZED).json({
//         message: ERROR_MESSAGES.TOKEN_EXPIRED,
//       })
//       return
//     }
//     ;(req as CustomRequest).user = {
//       ...user,
//       access_token: token.access_token,
//       refresh_token: token.refresh_token,
//     }
//     next()
//   } catch (error: unknown) {
//     if (error instanceof Error && error.name === 'TokenExpiredError') {
//       res.status(HTTP_STATUS.UNAUTHORIZED).json({
//         message: ERROR_MESSAGES.TOKEN_EXPIRED,
//       })
//       return
//     }
//     res.status(HTTP_STATUS.UNAUTHORIZED).json({
//       message: ERROR_MESSAGES.INVALID_TOKEN,
//     })
//     return
//   }
// }

// //*                 🛠️ Extract Token Helper Fn

// const extractToken = (
//   req: Request
// ): { access_token: string; refresh_token: string } | null => {
//   //   const userType = req.path.split("/")[1];
//   //   console.log('userTypee',userType)

//   //   if (!userType) return null;

//   return {
//     access_token: req.cookies?.[`access_token`] ?? null,
//     refresh_token: req.cookies?.[`refresh_token`] ?? null,
//   }
// }

// //*                 🛠️ Authorize Role Middleware

// export const authorizeRole = (allowedRoles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = (req as CustomRequest).user
//     if (!user || !allowedRoles.includes(user.role)) {
//       res.status(HTTP_STATUS.FORBIDDEN).json({
//         success: false,
//         message: ERROR_MESSAGES.NOT_ALLOWED,
//         userRole: user ? user.role : 'none',
//       })
//       return
//     }
//     next()
//   }
// }

// //*                 🛠️ Decode Token Middleware

// export const decodeToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = extractToken(req)

//     if (!token) {
//       res.status(HTTP_STATUS.UNAUTHORIZED).json({
//         message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
//       })
//       return
//     }

//     const user = tokenService.decodeAccessToken(token?.access_token)

//     ;(req as CustomRequest).user = {
//       userId: user?.userId,
//       email: user?.email,
//       role: user?.role,
//       access_token: token.access_token,
//       refresh_token: token.refresh_token,
//     }
//     next()
//   } catch {}
// }

import { Request, Response, NextFunction } from 'express'
import { JWTService } from '../../interfaceAdapters/services/jwt_service'
import { JwtPayload } from 'jsonwebtoken'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constants'
import { redisClient } from '../../interfaceAdapters/repositories/redis/redis.client'

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

const roleMap: Record<string, string> = {
  customer: 'customer',
  admin: 'admin',
  vendor: 'vendor',
}

const extractToken = (req: Request) => {
  const possibleRoles = ['customer', 'vendor', 'admin']
  const foundRole = possibleRoles.find((role) =>
    req.originalUrl.includes(`/api/v1/${role}`)
  )

  if (foundRole) {
    return {
      access_token: req.cookies[`${foundRole}_access_token`] || null,
      refresh_token: req.cookies[`${foundRole}_refresh_token`] || null,
    }
  }

  return null
}

const isBlacklisted = async (token: string): Promise<boolean> => {
  const result = await redisClient.get(token)
  console.log('is token blacklisted', result)
  return result !== null
}

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req)
    if (!token) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS })
      return
    }

    if (await isBlacklisted(token.access_token)) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.TOKEN_BLACKLISTED })
      return
    }
    const user = tokenService.verifyAccessToken(
      token.access_token
    ) as CustomJwtPayload
    if (!user || !user.id) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS })
      return
    }
    ;(req as CustomRequest).user = {
      ...user,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    }

    next()
  } catch (error) {
    console.log('token is invalid is worked', error)
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: ERROR_MESSAGES.INVALID_TOKEN,
      statuscode: HTTP_STATUS.UNAUTHORIZED,
    })
    return
  }
}

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req)
    if (!token?.refresh_token) {
      console.log('no token for decode')
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS })
      return
    }

    const user = tokenService.verifyRefreshToken(
      token?.refresh_token
    ) as CustomJwtPayload

    const newAccessToken = tokenService.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    ;(req as CustomRequest).user = {
      userId: user?.id,
      email: user?.email,
      role: user?.role,
      access_token: newAccessToken,
      refresh_token: token.refresh_token,
    }
    next()
  } catch (error) {
    console.log('failed to decode', error)
  }
}

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user
    if (!user || !allowedRoles.includes(user.role)) {
      console.log('this role is not allowed')
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: ERROR_MESSAGES.NOT_ALLOWED })
      return
    }
    next()
  }
}
