import { Schema } from 'mongoose'
import { IAdminModel } from '../models/admin_model'

export const adminSchema = new Schema<IAdminModel>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, default: 'admin' },
    status: { type: String, default: 'active' },
    role: { type: String, default: 'admin' },
  },
  {
    timestamps: true,
  }
)
