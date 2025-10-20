import { Document, model, ObjectId } from 'mongoose'
import { IVendorEntity } from '../../../../domain/models/vendor_entity'
import { vendorSchema } from '../schemas/vendor_schema'

export interface IVendorModel extends IVendorEntity, Document {
  _id: ObjectId
}

export const VendorModel = model<IVendorModel>('Vendor', vendorSchema)
