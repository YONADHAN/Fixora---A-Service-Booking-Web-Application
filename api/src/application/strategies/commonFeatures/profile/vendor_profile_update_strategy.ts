import { inject, injectable } from 'tsyringe'
import { ERROR_MESSAGES } from '../../../../shared/constants'
import { IVendorRepository } from '../../../../domain/repositoryInterfaces/users/vendor_repository.interface'
import { IVendorProfileUpdateStrategy } from './vendor_profile_update_strategy.interface'

@injectable()
export class VendorProfileUpdateStrategy
  implements IVendorProfileUpdateStrategy
{
  constructor(
    @inject('IVendorRepository')
    private _vendorRepository: IVendorRepository
  ) {}

  async execute({ data, userId }: { data: any; userId: string }) {
    const res = await this._vendorRepository.update({ userId }, data)
    if (!res) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND)
  }
}
