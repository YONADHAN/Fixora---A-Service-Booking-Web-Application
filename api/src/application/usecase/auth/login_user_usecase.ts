import { inject, injectable } from 'tsyringe'
import { ILoginUserUseCase } from '../../../domain/useCaseInterfaces/auth/login_usecase_interface'
import { LoginUserDTO } from '../../dtos/user_dto'
import { ILoginStrategyFactory } from '../../factories/auth/login/login_strategy_factory.interface'
import { ICustomerEntity } from '../../../domain/models/customer_entity'
import { IAdminEntity } from '../../../domain/models/admin_entity'
import { IVendorEntity } from '../../../domain/models/vendor_entity'
@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject('ILoginStrategyFactory')
    private _strategyFactory: ILoginStrategyFactory
  ) {}

  async execute(
    user: LoginUserDTO
  ): Promise<Partial<ICustomerEntity | IAdminEntity | IVendorEntity>> {
    const strategy = this._strategyFactory.getStrategy(user.role)

    return await strategy.login(user)
  }
}
