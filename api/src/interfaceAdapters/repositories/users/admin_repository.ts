import { injectable } from 'tsyringe'
import {
  AdminModel,
  IAdminModel,
} from '../../database/mongoDb/models/admin_model'
import { BaseRepository } from '../base_repository'
import { IAdminRepository } from '../../../domain/repositoryInterfaces/users/admin_repository.interface'

@injectable()
export class AdminRepository
  extends BaseRepository<IAdminModel>
  implements IAdminRepository
{
  constructor() {
    super(AdminModel)
  }
}
