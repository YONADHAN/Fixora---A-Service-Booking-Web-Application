import { Document, model, ObjectId } from 'mongoose'
import { IRefreshTokenEntity } from '../../../../domain/models/refreshToken_entity'
import { refreshTokenSchema } from '../schemas/refresh_token_schema'

export interface IRefreshTokenModel extends IRefreshTokenEntity, Document {
  _id: ObjectId
}

export const RefreshTokenModel = model<IRefreshTokenModel>(
  'RefreshToken',
  refreshTokenSchema
)
