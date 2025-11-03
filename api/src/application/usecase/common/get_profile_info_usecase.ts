import { inject, injectable } from 'tsyringe'

import { IGetProfileInfoUseCase } from '../../../domain/useCaseInterfaces/common/get_profile_info_usecase_interface'

import { IProfileFactory } from '../../factories/commonFeatures/profile/profile_factory.interface'
@injectable()
export class GetProfileInfoUseCase implements IGetProfileInfoUseCase {
  constructor(
    @inject('IProfileFactory')
    private _profileFactory: IProfileFactory
  ) {}

  async execute(role: string, userId: string) {
    return await this._profileFactory.getProfile(role, userId)
  }
}
