import { Schema } from 'mongoose'
import { ICustomerModel } from '../models/customer_model'

export const customerSchema = new Schema<ICustomerModel>(
  {
    userId: { type: String, unique: true },
    name: { type: String, unique: false },
    email: { type: String, required: true },
    role: { type: String, default: 'customer' },
    password: { type: String },
    phone: { type: String },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    googleId: { type: String },
    geoLocation: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    location: {
      name: { type: String },
      displayName: { type: String },
      zipCode: { type: String },
    },
  },
  { timestamps: true }
)

customerSchema.index({ geoLocation: '2dsphere' })
