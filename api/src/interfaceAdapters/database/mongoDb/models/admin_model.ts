import { model, ObjectId } from 'mongoose'
import { IAdminEntity } from '../../../../domain/models/admin_entity'
import { adminSchema } from '../schemas/admin_schema'

export interface IAdminModel extends IAdminEntity, Document {
  _id: ObjectId
}
export const AdminModel = model<IAdminModel>('Admin', adminSchema)
