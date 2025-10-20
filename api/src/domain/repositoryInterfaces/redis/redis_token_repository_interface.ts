export interface IRedisTokenRepository {
  storeResetToken(userId: string, token: string): Promise<void>
  verifyResetToken(userId: string, token: string): Promise<boolean>
  deleteResetToken(userId: string): Promise<void>
}
