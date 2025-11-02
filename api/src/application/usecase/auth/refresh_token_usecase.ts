import { inject, injectable } from 'tsyringe'
import { IRefreshTokenUseCase } from '../../../domain/useCaseInterfaces/auth/refresh_token_usecase_interface'
import { ITokenService } from '../../../domain/serviceInterfaces/token_service_interface'
import { CustomError } from '../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constants'
import { JwtPayload } from 'jsonwebtoken'

@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(@inject('ITokenService') private _tokenService: ITokenService) {}
  execute(refreshToken: string): { role: string; accessToken: string } {
    // console.log('entereed the refresh token usecase')
    const payload = this._tokenService.verifyRefreshToken(refreshToken)
    // console.log('payload is fetched', payload)
    // if (!payload) {
    //   console.log('We need to write the clear cookie logic here')
    // }
    if (!payload) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.BAD_REQUEST
      )
    }
    // console.log(
    //   'refresh token is not invalid so access token is created and returned'
    // )
    return {
      role: (payload as JwtPayload).role,
      accessToken: this._tokenService.generateAccessToken({
        userId: (payload as JwtPayload).userId,
        email: (payload as JwtPayload).email,
        role: (payload as JwtPayload).role,
      }),
    }
  }
}
