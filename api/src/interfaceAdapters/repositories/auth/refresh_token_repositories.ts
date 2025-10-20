import { injectable } from 'tsyringe'
import {
  IRefreshTokenModel,
  RefreshTokenModel,
} from '../../database/mongoDb/models/refresh_token_model'
import { BaseRepository } from '../base_repository'

@injectable()
export class RefreshTokenRepository extends BaseRepository<IRefreshTokenModel> {
  constructor() {
    super(RefreshTokenModel)
  }
  async revokeRefreshToken(token: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ token })
  }
}
