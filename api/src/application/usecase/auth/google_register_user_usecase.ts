import { inject, injectable } from 'tsyringe'
import { GoogleUserDTO } from '../../dtos/user_dto'
import { ICustomerEntity } from '../../../domain/models/customer_entity'
import { IVendorEntity } from '../../../domain/models/vendor_entity'
import { IGoogleRegistrationStrategyFactory } from '../../factories/auth/registration/google/google_registration_strategy_factory'

@injectable()
export class GoogleRegisterUserUseCase {
  constructor(
    @inject('IGoogleRegistrationStrategyFactory')
    private _googleStrategyFactory: IGoogleRegistrationStrategyFactory
  ) {}

  async execute(user: GoogleUserDTO): Promise<ICustomerEntity | IVendorEntity> {
    // Get the appropriate strategy based on role
    const strategy = this._googleStrategyFactory.getStrategy(user.role)

    // Register or return existing user
    return await strategy.register(user)
  }
}
