import { inject, injectable } from 'tsyringe'
import { IProfileInfoUpdateUseCase } from '../../../domain/useCaseInterfaces/common/profile_info_update_usecase_interface'
import { IProfileUpdateFactory } from '../../factories/commonFeatures/profile/profile_update_factory.interface'

@injectable()
export class ProfileInfoUpdateUseCase implements IProfileInfoUpdateUseCase {
  constructor(
    @inject('IProfileUpdateFactory')
    private _profileUpdateFactory: IProfileUpdateFactory
  ) {}

  async execute(role: string, data: any, userId: string) {
    return await this._profileUpdateFactory.getStrategy(role, data, userId)
  }
}
