import { inject, injectable } from 'tsyringe'
import { IFetchingVendorsStrategy } from './fetching_vendors_strategy.interface'
import { IVendorRepository } from '../../../../domain/repositoryInterfaces/users/vendor_repository.interface'
import { CustomError } from '../../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../../shared/constants'
import { UserMapper } from '../../../../application/mappers/admin/users.mapper'
import { GetAllUsersDTO } from '../../../../application/dtos/user_dto'

@injectable()
export class FetchingVendorsStrategy implements IFetchingVendorsStrategy {
  constructor(
    @inject('IVendorRepository')
    private _vendorRepository: IVendorRepository
  ) {}

  async execute(
    page: number,
    limit: number,
    search: string
  ): Promise<GetAllUsersDTO[]> {
    const vendors = await this._vendorRepository.findAll(page, limit, search)

    if (!vendors || vendors.length === 0) {
      throw new CustomError(
        ERROR_MESSAGES.USERS_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      )
    }

    const mappedVendors = UserMapper.toResponse(vendors)
    return mappedVendors
  }
}
