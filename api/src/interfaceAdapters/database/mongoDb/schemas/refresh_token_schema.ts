import { Schema } from 'mongoose'
import { IRefreshTokenModel } from '../models/refresh_token_model'

export const refreshTokenSchema = new Schema<IRefreshTokenModel>({
  user: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['admin', 'vendor', 'customer'],
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 604800,
  },
})
