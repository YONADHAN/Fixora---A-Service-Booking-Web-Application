import { inject, injectable } from 'tsyringe'
import { IVendorRepository } from '../../../../domain/repositoryInterfaces/users/vendor_repository.interface'
import { VendorProfileMapper } from '../../../mappers/vendor/vendor_profile_mapper'
import { ERROR_MESSAGES } from '../../../../shared/constants'
import { IVendorProfileStrategy } from './vendor_profile_strategy.interface'

@injectable()
export class VendorProfileStrategy implements IVendorProfileStrategy {
  constructor(
    @inject('IVendorRepository')
    private _VendorRepository: IVendorRepository
  ) {}

  async execute({ userId }: { userId: string }) {
    const data = await this._VendorRepository.findOne({ userId })
    if (!data) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND)
    return VendorProfileMapper.toDTO(data)
  }
}
