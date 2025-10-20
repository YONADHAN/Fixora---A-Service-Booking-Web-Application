import { inject, injectable } from 'tsyringe'
import { IRegisterUserUseCase } from '../../../domain/useCaseInterfaces/auth/register_usecase_interface'
import { UserDTO } from '../../dtos/user_dto'
import { ICustomerEntity } from '../../../domain/models/customer_entity'
import { IVendorEntity } from '../../../domain/models/vendor_entity'
import { IAdminEntity } from '../../../domain/models/admin_entity'
import { IRegistrationStrategyFactory } from '../../factories/auth/registration/registration_strategy_factory.interface'

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject('IRegistrationStrategyFactory')
    private _strategyFactory: IRegistrationStrategyFactory
  ) {}

  async execute(
    user: UserDTO
  ): Promise<ICustomerEntity | IVendorEntity | IAdminEntity> {
    const strategy = this._strategyFactory.getStrategy(user.role)
    return await strategy.register(user)
  }
}
