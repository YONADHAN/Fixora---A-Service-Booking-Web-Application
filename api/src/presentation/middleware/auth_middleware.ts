import { Request, Response, NextFunction } from 'express'
import { JWTService } from '../../interfaceAdapters/services/jwt_service'
import { JwtPayload } from 'jsonwebtoken'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../shared/constants'
import { redisClient } from '../../interfaceAdapters/repositories/redis/redis.client'
import { clearAuthCookies } from '../../shared/utils/cookie_helper'

const tokenService = new JWTService()

export interface CustomJWTPayload extends JwtPayload {
  userId: string
  email: string
  role: string
  access_token: string
  refresh_token: string
}

export interface CustomRequest extends Request {
  user: CustomJWTPayload
}

const roleMap: Record<string, string> = {
  customer: 'customer',
  admin: 'admin',
  vendor: 'vendor',
}

const extractToken = (
  req: Request
): { access_token: string; refresh_token: string } | null => {
  const basePath = req.baseUrl.split('/')

  const userType = roleMap[basePath[3]]

  if (['customer', 'vendor', 'admin'].includes(userType)) {
    return {
      access_token: req.cookies[`${userType}_access_token`] || null,
      refresh_token: req.cookies[`${userType}_refresh_token`] || null,
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
    ) as CustomJWTPayload

    if (!user || !user.userId) {
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
    console.log('entered the decode token')
    const token = extractToken(req)
    if (!token?.refresh_token) {
      console.log('no token for decode')
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS })
      return
    }
    console.log('got the refresh token')
    const user = tokenService.verifyRefreshToken(
      token?.refresh_token
    ) as CustomJWTPayload
    console.log('got user data from verifying the refresh token', user)
    const newAccessToken = tokenService.generateAccessToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    })
    console.log('create new access token from the data', newAccessToken)
    console.log(
      'entering datas like this into customRequest',
      JSON.stringify({
        userId: user?.userId,
        email: user?.email,
        role: user?.role,
        access_token: newAccessToken,
        refresh_token: token.refresh_token,
      })
    )
    ;(req as CustomRequest).user = {
      userId: user?.userId,
      email: user?.email,
      role: user?.role,
      access_token: newAccessToken,
      refresh_token: token.refresh_token,
    }
    next()
  } catch (error) {
    console.log('failed to decode', error)
    const basePath = req.baseUrl.split('/')
    const role = basePath[3]

    if (role) {
      const accessTokenName = `${role}_access_token`
      const refreshTokenName = `${role}_refresh_token`
      clearAuthCookies(res, accessTokenName, refreshTokenName)
    }
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: ERROR_MESSAGES.INVALID_TOKEN,
    })
  }
}

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user
    if (!user || !allowedRoles.includes(user.role)) {
      console.log('this role is not allowed')
      res.status(HTTP_STATUS.FORBIDDEN).json({
        message: ERROR_MESSAGES.NOT_ALLOWED,
        user: user ? user.role : '',
      })

      return
    }
    next()
  }
}
