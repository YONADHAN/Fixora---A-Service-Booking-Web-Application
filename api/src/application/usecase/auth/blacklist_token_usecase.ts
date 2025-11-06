import { IBlacklistTokenUseCase } from '../../../domain/useCaseInterfaces/auth/blacklist_token_usecase_interface'
import { inject, injectable } from 'tsyringe'
import { ITokenService } from '../../../domain/serviceInterfaces/token_service_interface'
import { JwtPayload } from 'jsonwebtoken'
import { redisClient } from '../../../interfaceAdapters/repositories/redis/redis.client'

@injectable()
export class BlacklistTokenUseCase implements IBlacklistTokenUseCase {
  constructor(@inject('ITokenService') private tokenService: ITokenService) {}

  async execute(token: string): Promise<void> {
    console.log('hitting blacklist token usecase')
    const decoded = this.tokenService.verifyAccessToken(
      token
    ) as JwtPayload | null
    console.log('decoded from the blacklist_token_usecase:', decoded)
    if (!decoded || typeof decoded !== 'object' || !('exp' in decoded)) {
      throw new Error('Invalid token: Missing or malformed payload')
    }
    console.log(
      'verification of the access token of the user happens in the blacklist usecase'
    )
    const now = Math.floor(Date.now() / 1000)
    const expiresIn = decoded.exp! - now
    console.log('setting expires in for the token', expiresIn)
    if (expiresIn > 0) {
      await redisClient.set(token, 'blacklisted', { EX: expiresIn })
    }
    console.log('redisClient sets the blacklist access token of the user ')
  }
}
