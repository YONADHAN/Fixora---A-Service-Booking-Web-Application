import { injectable } from 'tsyringe'
import { BaseRepository } from '../base_repository'
import {
  VendorModel,
  IVendorModel,
} from '../../database/mongoDb/models/vendor_model'
import { IVendorRepository } from '../../../domain/repositoryInterfaces/users/vendor_repository.interface'

@injectable()
export class VendorRepository
  extends BaseRepository<IVendorModel>
  implements IVendorRepository
{
  constructor() {
    super(VendorModel)
  }
}
