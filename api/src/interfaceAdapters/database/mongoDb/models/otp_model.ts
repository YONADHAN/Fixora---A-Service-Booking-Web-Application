import { Document, model, ObjectId } from 'mongoose'
import { IOtpEntity } from '../../../../domain/models/otp_entity'
import { otpSchema } from '../schemas/otp_schema'

export interface IOtpModel extends IOtpEntity, Document {
  _id: ObjectId
}

export const OtpModel = model<IOtpModel>('Otp', otpSchema)
