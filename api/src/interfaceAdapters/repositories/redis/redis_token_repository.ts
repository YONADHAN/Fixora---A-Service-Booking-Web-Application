import { injectable } from 'tsyringe'
import { IRedisTokenRepository } from '../../../domain/repositoryInterfaces/redis/redis_token_repository_interface'
import { redisClient } from './redis.client'

@injectable()
export class RedisTokenRepository implements IRedisTokenRepository {
  async storeResetToken(userId: string, token: string): Promise<void> {
    const key = `reset_token:${userId}`
    await redisClient.setEx(key, 300, token)
  }
  async verifyResetToken(userId: string, token: string): Promise<boolean> {
    const key = `reset_token:${userId}`
    const storedToken = await redisClient.get(key)
    return storedToken === token
  }
  async deleteResetToken(userId: string) {
    const key = `reset_token:${userId}`
    await redisClient.del(key)
  }
}
