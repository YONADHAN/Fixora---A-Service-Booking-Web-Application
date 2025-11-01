import { IRevokeRefreshTokenUseCase } from '../../../domain/useCaseInterfaces/auth/revoke_refresh_token_usecase'
import { redisClient } from '../../../interfaceAdapters/repositories/redis/redis.client'
import { injectable } from 'tsyringe'

@injectable()
export class RevokeRefreshTokenUseCase implements IRevokeRefreshTokenUseCase {
  constructor() {}
  async execute(token: string): Promise<void> {
    await redisClient.del(`refresh:${token}`)
  }
}
