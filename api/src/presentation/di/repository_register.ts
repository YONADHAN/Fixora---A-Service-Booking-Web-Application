import { container } from 'tsyringe'
import { OtpRepository } from '../../interfaceAdapters/repositories/auth/otp_repository'
import { CustomerRepository } from '../../interfaceAdapters/repositories/users/customer_repository'
import { AdminRepository } from '../../interfaceAdapters/repositories/users/admin_repository'
import { VendorRepository } from '../../interfaceAdapters/repositories/users/vendor_repository'
import { RefreshTokenRepository } from '../../interfaceAdapters/repositories/auth/refresh_token_repositories'
import { IRefreshTokenRepository } from '../../domain/repositoryInterfaces/auth/refresh_token_repository.interface'
import { RedisTokenRepository } from '../../interfaceAdapters/repositories/redis/redis_token_repository'
import { IRedisTokenRepository } from '../../domain/repositoryInterfaces/redis/redis_token_repository_interface'
export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register('IOtpRepository', {
      useClass: OtpRepository,
    })

    container.register('ICustomerRepository', {
      useClass: CustomerRepository,
    })

    container.register('IAdminRepository', {
      useClass: AdminRepository,
    })

    container.register('IVendorRepository', {
      useClass: VendorRepository,
    })

    container.register<IRefreshTokenRepository>('IRefreshTokenRepository', {
      useClass: RefreshTokenRepository,
    })

    container.register<IRedisTokenRepository>('IRedisTokenRepository', {
      useClass: RedisTokenRepository,
    })
  }
}
