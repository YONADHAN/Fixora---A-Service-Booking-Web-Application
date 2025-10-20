import { inject, injectable } from 'tsyringe'
import { IGenerateTokenUseCase } from '../../../domain/useCaseInterfaces/auth/generate_token_usecase_interface'
import { ITokenService } from '../../../domain/serviceInterfaces/token_service_interface'
import { IRefreshTokenRepository } from '../../../domain/repositoryInterfaces/auth/refresh_token_repository.interface'
import { TRole } from '../../../shared/constants'

@injectable()
export class GenerateTokenUseCase implements IGenerateTokenUseCase {
  constructor(
    @inject('ITokenService')
    private _tokenService: ITokenService,
    @inject('IRefreshTokenRepository')
    private _refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(
    userId: string,
    email: string,
    role: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { email, userId, role }

    const accessToken = this._tokenService.generateAccessToken(payload)
    const refreshToken = this._tokenService.generateRefreshToken(payload)

    await this._refreshTokenRepository.save({
      token: refreshToken,
      userType: role as TRole,
      user: userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
