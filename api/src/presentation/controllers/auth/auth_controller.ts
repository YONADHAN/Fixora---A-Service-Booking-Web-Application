import { inject, injectable } from 'tsyringe'
import { Request, Response } from 'express'
import 'reflect-metadata'

import { IAuthController } from '../../../domain/controllerInterfaces/users/auth-controller.interface'
import { ISendOtpEmailUseCase } from '../../../domain/useCaseInterfaces/auth/sent_otp_usecase_interface'
import { IVerifyOtpUseCase } from '../../../domain/useCaseInterfaces/auth/verify_otp_usecase_interface'
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  TRole,
} from '../../../shared/constants'

import { handleErrorResponse } from '../../../shared/utils/error_handler'
import { otpMailValidationSchema } from './validations/otp_mail_validation_schema'
import { userSchema } from './validations/user_signup_validation_schema'
import { IRegisterUserUseCase } from '../../../domain/useCaseInterfaces/auth/register_usecase_interface'
import { ILoginUserUseCase } from '../../../domain/useCaseInterfaces/auth/login_usecase_interface'
import { LoginUserDTO } from '../../../application/dtos/user_dto'
import {
  clearAuthCookies,
  setAuthCookies,
  updateCookieWithAccessToken,
} from '../../../shared/utils/cookie_helper'
import { loginSchema } from './validations/user_login_validation_schema'
import { IGenerateTokenUseCase } from '../../../domain/useCaseInterfaces/auth/generate_token_usecase_interface'
import { forgotPasswordValidationSchema } from './validations/forgot_password_validation_schema'
import { IForgotPasswordUseCase } from '../../../domain/useCaseInterfaces/auth/forgot_password_usecase_interface'
import { resetPasswordValidationSchema } from './validations/reset_password_validation_schema'
import { IResetPasswordUseCase } from '../../../domain/useCaseInterfaces/auth/reset_password_usecase_interface'
import { IRevokeRefreshTokenUseCase } from '../../../domain/useCaseInterfaces/auth/revoke_refresh_token_usecase'
import { IBlacklistTokenUseCase } from '../../../domain/useCaseInterfaces/auth/blacklist_token_usecase_interface'

import { IRefreshTokenUseCase } from '../../../domain/useCaseInterfaces/auth/refresh_token_usecase_interface'
import { CustomRequest } from '../../middleware/auth_middleware'
@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject('ISendOtpEmailUseCase')
    private _sendOtpEmailUseCase: ISendOtpEmailUseCase,
    @inject('IVerifyOtpUseCase')
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    @inject('IRegisterUserUseCase')
    private _registerUserUseCase: IRegisterUserUseCase,
    @inject('IGenerateTokenUseCase')
    private _generateTokenUseCase: IGenerateTokenUseCase,
    @inject('ILoginUserUseCase')
    private _loginUserUseCase: ILoginUserUseCase,
    @inject('IForgotPasswordUseCase')
    private _forgotPasswordUseCase: IForgotPasswordUseCase,
    @inject('IResetPasswordUseCase')
    private _resetPasswordUseCase: IResetPasswordUseCase,
    @inject('IRevokeRefreshTokenUseCase')
    private _revokeRefreshTokenUseCase: IRevokeRefreshTokenUseCase,
    @inject('IBlacklistTokenUseCase')
    private _blacklistTokenUseCase: IBlacklistTokenUseCase,
    @inject('IRefreshTokenUseCase')
    private _refreshTokenUseCase: IRefreshTokenUseCase
  ) {}
  // controller for sending otp to emails
  // giving email as parameter
  async sendOtpEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body
      await this._sendOtpEmailUseCase.execute(email)
      res.status(HTTP_STATUS.OK).json({
        message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS,
        success: true,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }
  //controller for verifying otp
  //giving email and otp as parameters
  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body
      const validatedData = otpMailValidationSchema.parse({ email, otp })
      await this._verifyOtpUseCase.execute(validatedData)
      res.status(HTTP_STATUS.OK).json({
        message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS,
        success: true,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }
  //controller for registering the users
  //giving the user data + role in body
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body as { role: keyof typeof userSchema }

      const schema = userSchema[role]

      if (!schema) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        })
        return
      }
      //console.log('schema failed')
      const validatedData = schema.parse(req.body)

      await this._registerUserUseCase.execute(validatedData)

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }
  //controller for make the users login
  //giving the email,password and role in body
  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as LoginUserDTO
      const validatedData = loginSchema.parse(data)

      if (!validatedData) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        })
        return
      }
      const user = await this._loginUserUseCase.execute(validatedData)

      if (!user.userId || !user.email || !user.role) {
        throw new Error('User ID, email, or role is missing')
      }

      const tokens = await this._generateTokenUseCase.execute(
        user.userId as string,
        user.email,
        user.role
      )

      const accessTokenName = `${user.role}_access_token`
      const refreshTokenName = `${user.role}_refresh_token`

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName
      )
      const { password, ...userWithoutPassword } = user
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: userWithoutPassword,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }
  //controller for users to click the forgot password
  //giving email and role in body
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = forgotPasswordValidationSchema.parse(req.body)
      if (!validatedData) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        })
        return
      }

      await this._forgotPasswordUseCase.execute(validatedData)

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.EMAIL_SENT_SUCCESSFULLY,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }
  //controller for reseting the password
  //giving token as parameter
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = resetPasswordValidationSchema.parse(req.body)
      if (!validatedData) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        })
      }

      await this._resetPasswordUseCase.execute(validatedData)
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      await this._blacklistTokenUseCase.execute(
        (req as CustomRequest).user.access_token
      )

      await this._revokeRefreshTokenUseCase.execute(
        (req as CustomRequest).user.refresh_token
      )
      console.log('revoking working')
      const user = (req as CustomRequest).user
      console.log('user fetched from request', user)
      const accessTokenName = `${user.role}_access_token`
      const refreshTokenName = `${user.role}_refresh_token`
      clearAuthCookies(res, accessTokenName, refreshTokenName)
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.USER_LOGOUT_SUCCESS })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }

  async handleTokenRefresh(req: Request, res: Response): Promise<void> {
    try {
      // console.log('entered route')
      const token = (req as CustomRequest).user.refresh_token
      // console.log('token in handleTokenRefresh', token)
      const newToken = this._refreshTokenUseCase.execute(token)
      //console.log('new token was created from refresh token usecase', newToken)
      const access_token_name = `${newToken.role}_access_token`
      //console.log('created access_token_name')
      updateCookieWithAccessToken(res, newToken.accessToken, access_token_name)
      //console.log('Updated cookies with new access token')
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.REFRESH_TOKEN_REFRESHED_SUCCESS,
        token: newToken.accessToken,
      })
    } catch (error) {
      handleErrorResponse(req, res, error)
    }
  }

  // async authenticateWithGoogle(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { credential, client_id, role } = req.body
  //     const user = await this._googleLoginUseCase.execute(
  //       credential,
  //       client_id,
  //       role
  //     )
  //     if (!user.userId || !user.email || !user.role) {
  //       throw new Error('User ID, email or role is missing')
  //     }
  //     const tokens = await this._generateTokenUseCase.execute(
  //       user.userId,
  //       user.email,
  //       user.role
  //     )
  //     const accessTokenName = `${user.role}_access_token`
  //     const refreshTokenName = `${user.role}_refresh_token`

  //     setAuthCookies(
  //       res,
  //       tokens.accessToken,
  //       tokens.refreshToken,
  //       accessTokenName,
  //       refreshTokenName
  //     )
  //     res.status(HTTP_STATUS.OK).json({
  //       success: true,
  //       message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
  //       user: user,
  //     })
  //   } catch (error) {
  //     handleErrorResponse(req, res, error)
  //   }
  // }
}
