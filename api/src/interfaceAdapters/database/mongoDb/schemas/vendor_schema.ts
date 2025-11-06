import { Schema } from 'mongoose'
import { IVendorModel } from '../models/vendor_model'

export const vendorSchema = new Schema<IVendorModel>(
  {
    userId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: 'vendor' },
    googleId: { type: String },
    status: { type: String, default: 'pending' },

    geoLocation: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: [Number],
    },

    location: {
      name: String,
      displayName: String,
      zipCode: String,
    },

    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        verified: { type: Boolean, default: false },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    isVerified: {
      status: {
        type: String,
        default: 'Pending',
        enum: ['accepted', 'rejected', 'pending'],
      },
      description: {
        type: String,
        default: '',
      },
    },
  },
  { timestamps: true }
)

vendorSchema.index({ geoLocation: '2dsphere' })
