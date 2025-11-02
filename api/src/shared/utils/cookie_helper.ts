import { config } from 'dotenv'
import { Response } from 'express'
config()

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  accessTokenName: string,
  refreshTokenName: string
) => {
  const isProduction = process.env.NODE_ENV === 'production'
  res.cookie(accessTokenName, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
  })
  res.cookie(refreshTokenName, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
  })
}

export const updateCookieWithAccessToken = (
  res: Response,
  accessToken: string,
  accessTokenName: string
) => {
  const isProduction = process.env.NODE_ENV === 'production'
  res.cookie(accessTokenName, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
  })
}

// export const clearAuthCookies = (
//   res: Response,
//   accessTokenName: string,
//   refreshTokenName: string
// ) => {
//   res.clearCookie(accessTokenName)
//   res.clearCookie(refreshTokenName)
// }

export const clearAuthCookies = (
  res: Response,
  accessTokenName: string,
  refreshTokenName: string
) => {
  const isProduction = process.env.NODE_ENV === 'production'

  res.clearCookie(accessTokenName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
  })
  res.clearCookie(refreshTokenName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
  })

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
}
