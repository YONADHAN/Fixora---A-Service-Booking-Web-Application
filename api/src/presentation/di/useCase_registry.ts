import { container } from 'tsyringe'
//service
import { EmailService } from '../../interfaceAdapters/services/email_service'
import { IEmailService } from '../../domain/serviceInterfaces/email_service_interface'
import { UserExistenceService } from '../../interfaceAdapters/services/user_existence.service'
import { IUserExistenceService } from '../../domain/serviceInterfaces/user_existence_service.interface'
import { OtpService } from '../../interfaceAdapters/services/otp_service'
import { IOtpService } from '../../domain/serviceInterfaces/otp_service_interface'
import { CloudinaryService } from '../../interfaceAdapters/services/cloudinary_service'
import { ICloudinaryService } from '../../domain/serviceInterfaces/cloudinary_service_interface'
import { ITokenService } from '../../domain/serviceInterfaces/token_service_interface'
import { JWTService } from '../../interfaceAdapters/services/jwt_service'
//security
import { IBcrypt } from '../security/bcrypt_interface'
import { OtpBcrypt } from '../security/otp_bcrypt'
import { PasswordBcrypt } from '../security/password_bcrypt'
//usecase
import { sendOtpEmailUseCase } from '../../application/usecase/auth/send_otp_email_useCase'
import { ISendOtpEmailUseCase } from '../../domain/useCaseInterfaces/auth/sent_otp_usecase_interface'
import { IVerifyOtpUseCase } from '../../domain/useCaseInterfaces/auth/verify_otp_usecase_interface'
import { VerifyOtpUseCase } from '../../application/usecase/auth/verify_otp_usecase'
import { IRegisterUserUseCase } from '../../domain/useCaseInterfaces/auth/register_usecase_interface'
import { RegisterUserUseCase } from '../../application/usecase/auth/register_user_usecase'
import { IGenerateTokenUseCase } from '../../domain/useCaseInterfaces/auth/generate_token_usecase_interface'
import { GenerateTokenUseCase } from '../../application/usecase/auth/generate_token_usecase'
import { ILoginUserUseCase } from '../../domain/useCaseInterfaces/auth/login_usecase_interface'
import { LoginUserUseCase } from '../../application/usecase/auth/login_user_usecase'
import { IForgotPasswordUseCase } from '../../domain/useCaseInterfaces/auth/forgot_password_usecase_interface'
import { ForgotPasswordUseCase } from '../../application/usecase/auth/forgot_password_usecase'
import { IResetPasswordUseCase } from '../../domain/useCaseInterfaces/auth/reset_password_usecase_interface'
import { ResetPasswordUseCase } from '../../application/usecase/auth/reset_password_usecase'
import { IBlacklistTokenUseCase } from '../../domain/useCaseInterfaces/auth/blacklist_token_usecase_interface'
import { BlacklistTokenUseCase } from '../../application/usecase/auth/blacklist_token_usecase'
import { IRevokeRefreshTokenUseCase } from '../../domain/useCaseInterfaces/auth/revoke_refresh_token_usecase'
import { RevokeRefreshTokenUseCase } from '../../application/usecase/auth/revoke_refresh_token_usecase'
import { RefreshTokenUseCase } from '../../application/usecase/auth/refresh_token_usecase'
import { IRefreshTokenUseCase } from '../../domain/useCaseInterfaces/auth/refresh_token_usecase_interface'
import { IGetProfileInfoUseCase } from '../../domain/useCaseInterfaces/common/get_profile_info_usecase_interface'
import { GetProfileInfoUseCase } from '../../application/usecase/common/get_profile_info_usecase'
import { IProfileInfoUpdateUseCase } from '../../domain/useCaseInterfaces/common/profile_info_update_usecase_interface'
import { ProfileInfoUpdateUseCase } from '../../application/usecase/common/profile_info_update_usecase'
import { IGetAllUsersUseCase } from '../../domain/useCaseInterfaces/common/get_all_users_usecase_interface'
import { GetAllUsersUseCase } from '../../application/usecase/common/get_all_users_usecase'
import { IChangeMyUserBlockStatusUseCase } from '../../domain/useCaseInterfaces/admin/change_my_users_block_status_usecase_interface'
import { ChangeMyUserBlockStatusUseCase } from '../../application/usecase/admin/block-status/change_my_user_block_status_usecase'
//factory
import { RegistrationStrategyFactory } from '../../application/factories/auth/registration/registration_strategy_factory'
import { IRegistrationStrategyFactory } from '../../application/factories/auth/registration/registration_strategy_factory.interface'
import { LoginStrategyFactory } from '../../application/factories/auth/login/login_strategy_factory'
import { ILoginStrategyFactory } from '../../application/factories/auth/login/login_strategy_factory.interface'
import { ForgotPasswordStrategyFactory } from '../../application/factories/auth/forgot_password/forgot_password_strategy_factory'
import { IForgotPasswordStrategyFactory } from '../../application/factories/auth/forgot_password/forgot_password_strategy_factory.interface'
import { ResetPasswordStrategyFactory } from '../../application/factories/auth/reset_password/reset_password_strategy_factory'
import { IResetPasswordStrategyFactory } from '../../application/factories/auth/reset_password/reset_password_strategy_factory.interface'
import { IProfileFactory } from '../../application/factories/commonFeatures/profile/profile_factory.interface'
import { ProfileFactory } from '../../application/factories/commonFeatures/profile/profile_factory'
import { ProfileUpdateFactory } from '../../application/factories/commonFeatures/profile/profile_update_factory'
import { IProfileUpdateFactory } from '../../application/factories/commonFeatures/profile/profile_update_factory.interface'
import { IGetAllUsersFactory } from '../../application/factories/commonFeatures/users/get_all_users_factory.interface'
import { GetAllUsersFactory } from '../../application/factories/commonFeatures/users/get_all_users_factory'
import { IChangeMyUserBlockStatusFactory } from '../../application/factories/admin/block_status/change_my_user_block_status_factory.interface'
import { ChangeMyUserBlockStatusFactory } from '../../application/factories/admin/block_status/change_my_user_block_status_factory'
//strategy
import { CustomerRegistrationStrategy } from '../../application/strategies/auth/registration/customer_registration_strategy'
import { ICustomerRegistrationStrategy } from '../../application/strategies/auth/registration/customer_registration_strategy.interface'
import { AdminRegistrationStrategy } from '../../application/strategies/auth/registration/admin_registration_strategy'
import { IAdminRegistrationStrategy } from '../../application/strategies/auth/registration/admin_registration_strategy.interface'
import { VendorRegistrationStrategy } from '../../application/strategies/auth/registration/vendor_registration_strategy'
import { IVendorRegistrationStrategy } from '../../application/strategies/auth/registration/vendor_registration_strategy.interface'
import { AdminLoginStrategy } from '../../application/strategies/auth/login/admin_login_strategy'
import { IAdminLoginStrategy } from '../../application/strategies/auth/login/admin_login_strategy.interface'
import { CustomerLoginStrategy } from '../../application/strategies/auth/login/customer_login_strategy'
import { ICustomerLoginStrategy } from '../../application/strategies/auth/login/customer_login_strategy.interface'
import { VendorLoginStrategy } from '../../application/strategies/auth/login/vendor_login_strategy'
import { IVendorLoginStrategy } from '../../application/strategies/auth/login/vendor_login_strategy.interface'
import { IAdminForgotPasswordStrategy } from '../../application/strategies/auth/forgot_password/admin_forgot_password_strategy.interface'
import { AdminForgotPasswordStrategy } from '../../application/strategies/auth/forgot_password/admin_forgot_password_strategy'
import { ICustomerForgotPasswordStrategy } from '../../application/strategies/auth/forgot_password/customer_forgot_password_strategy.interface'
import { CustomerForgotPasswordStrategy } from '../../application/strategies/auth/forgot_password/customer_forgot_password_strategy'
import { IVendorForgotPasswordStrategy } from '../../application/strategies/auth/forgot_password/vendor_forgot_password_strategy.interface'
import { VendorForgotPasswordStrategy } from '../../application/strategies/auth/forgot_password/vendor_forgot_password_strategy'
import { IAdminResetPasswordStrategy } from '../../application/strategies/auth/reset_password/admin_reset_password_strategy.interface'
import { AdminResetPasswordStrategy } from '../../application/strategies/auth/reset_password/admin_reset_password_strategy'
import { IVendorResetPasswordStrategy } from '../../application/strategies/auth/reset_password/vendor_reset_password_strategy.interface'
import { VendorResetPasswordStrategy } from '../../application/strategies/auth/reset_password/vendor_reset_password_strategy'
import { ICustomerResetPasswordStrategy } from '../../application/strategies/auth/reset_password/customer_reset_password_strategy.interface'
import { CustomerResetPasswordStrategy } from '../../application/strategies/auth/reset_password/customer_reset_password_strategy'

import { ICustomerProfileStrategy } from '../../application/strategies/commonFeatures/profile/customer_profile_strategy.interface'
import { CustomerProfileStrategy } from '../../application/strategies/commonFeatures/profile/customer_profile_strategy'
import { IVendorProfileStrategy } from '../../application/strategies/commonFeatures/profile/vendor_profile_strategy.interface'
import { VendorProfileStrategy } from '../../application/strategies/commonFeatures/profile/vendor_profile_strategy'

import { ICustomerProfileUpdateStrategy } from '../../application/strategies/commonFeatures/profile/customer_profile_update_strategy.interface'
import { CustomerProfileUpdateStrategy } from '../../application/strategies/commonFeatures/profile/customer_profile_update_strategy'
import { IVendorProfileUpdateStrategy } from '../../application/strategies/commonFeatures/profile/vendor_profile_update_strategy.interface'
import { VendorProfileUpdateStrategy } from '../../application/strategies/commonFeatures/profile/vendor_profile_update_strategy'

import { IFetchingCustomersStrategy } from '../../application/strategies/commonFeatures/users/fetching_customers_strategy.interface'
import { FetchingCustomersStrategy } from '../../application/strategies/commonFeatures/users/fetching_customers_strategy'
import { IFetchingVendorsStrategy } from '../../application/strategies/commonFeatures/users/fetching_vendors_strategy.interface'
import { FetchingVendorsStrategy } from '../../application/strategies/commonFeatures/users/fetching_vendors_strategy'

import { IChangeMyCustomersBlockStatusStrategy } from '../../application/strategies/commonFeatures/users/block_status/change_my_customers_block_status_strategy.interface'
import { ChangeMyCustomersBlockStatusStrategy } from '../../application/strategies/commonFeatures/users/block_status/change_my_customers_block_status_strategy'
import { IChangeMyVendorsBlockStatusStrategy } from '../../application/strategies/commonFeatures/users/block_status/change_my_vendors_block_status_strategy.interface'
import { ChangeMyVendorsBlockStatusStrategy } from '../../application/strategies/commonFeatures/users/block_status/change_my_vendors_block_status_strategy'

export class UseCaseRegistry {
  static registerUseCases(): void {
    container.register<IOtpService>('IOtpService', {
      useClass: OtpService,
    })
    container.register<ISendOtpEmailUseCase>('ISendOtpEmailUseCase', {
      useClass: sendOtpEmailUseCase,
    })

    container.register<IVerifyOtpUseCase>('IVerifyOtpUseCase', {
      useClass: VerifyOtpUseCase,
    })

    container.register<IRegisterUserUseCase>('IRegisterUserUseCase', {
      useClass: RegisterUserUseCase,
    })

    container.register<IGenerateTokenUseCase>('IGenerateTokenUseCase', {
      useClass: GenerateTokenUseCase,
    })

    container.register<ILoginUserUseCase>('ILoginUserUseCase', {
      useClass: LoginUserUseCase,
    })

    container.register<IForgotPasswordUseCase>('IForgotPasswordUseCase', {
      useClass: ForgotPasswordUseCase,
    })

    container.register<IResetPasswordUseCase>('IResetPasswordUseCase', {
      useClass: ResetPasswordUseCase,
    })
    container.register<IBlacklistTokenUseCase>('IBlacklistTokenUseCase', {
      useClass: BlacklistTokenUseCase,
    })
    container.register<IRevokeRefreshTokenUseCase>(
      'IRevokeRefreshTokenUseCase',
      {
        useClass: RevokeRefreshTokenUseCase,
      }
    )

    container.register<IRefreshTokenUseCase>('IRefreshTokenUseCase', {
      useClass: RefreshTokenUseCase,
    })

    container.register<IGetProfileInfoUseCase>('IGetProfileInfoUseCase', {
      useClass: GetProfileInfoUseCase,
    })

    container.register<IProfileInfoUpdateUseCase>('IProfileInfoUpdateUseCase', {
      useClass: ProfileInfoUpdateUseCase,
    })

    container.register<IGetAllUsersUseCase>('IGetAllUsersUseCase', {
      useClass: GetAllUsersUseCase,
    })

    container.register<IChangeMyUserBlockStatusUseCase>(
      'IChangeMyUserBlockStatusUseCase',
      {
        useClass: ChangeMyUserBlockStatusUseCase,
      }
    )
    //security
    container.register<IBcrypt>('IPasswordBcrypt', {
      useClass: PasswordBcrypt,
    })

    container.register<IBcrypt>('IOtpBcrypt', {
      useClass: OtpBcrypt,
    })
    //service
    container.register<IUserExistenceService>('IUserExistenceService', {
      useClass: UserExistenceService,
    })

    container.register<IEmailService>('IEmailService', {
      useClass: EmailService,
    })

    container.register<ICloudinaryService>('ICloudinaryService', {
      useClass: CloudinaryService,
    })

    container.register<ITokenService>('ITokenService', {
      useClass: JWTService,
    })
    //factory
    container.register<IRegistrationStrategyFactory>(
      'IRegistrationStrategyFactory',
      {
        useClass: RegistrationStrategyFactory,
      }
    )

    container.register<ILoginStrategyFactory>('ILoginStrategyFactory', {
      useClass: LoginStrategyFactory,
    })

    container.register<IForgotPasswordStrategyFactory>(
      'IForgotPasswordStrategyFactory',
      {
        useClass: ForgotPasswordStrategyFactory,
      }
    )

    container.register<IResetPasswordStrategyFactory>(
      'IResetPasswordStrategyFactory',
      {
        useClass: ResetPasswordStrategyFactory,
      }
    )

    container.register<IProfileFactory>('IProfileFactory', {
      useClass: ProfileFactory,
    })

    container.register<IProfileUpdateFactory>('IProfileUpdateFactory', {
      useClass: ProfileUpdateFactory,
    })
    container.register<IGetAllUsersFactory>('IGetAllUsersFactory', {
      useClass: GetAllUsersFactory,
    })

    container.register<IChangeMyUserBlockStatusFactory>(
      'IChangeMyUserBlockStatusFactory',
      {
        useClass: ChangeMyUserBlockStatusFactory,
      }
    )
    //strategy
    container.register<ICustomerRegistrationStrategy>(
      'ICustomerRegistrationStrategy',
      {
        useClass: CustomerRegistrationStrategy,
      }
    )
    container.register<IAdminRegistrationStrategy>(
      'IAdminRegistrationStrategy',
      {
        useClass: AdminRegistrationStrategy,
      }
    )
    container.register<IVendorRegistrationStrategy>(
      'IVendorRegistrationStrategy',
      {
        useClass: VendorRegistrationStrategy,
      }
    )

    container.register<IAdminLoginStrategy>('IAdminLoginStrategy', {
      useClass: AdminLoginStrategy,
    })

    container.register<ICustomerLoginStrategy>('ICustomerLoginStrategy', {
      useClass: CustomerLoginStrategy,
    })

    container.register<IVendorLoginStrategy>('IVendorLoginStrategy', {
      useClass: VendorLoginStrategy,
    })

    container.register<IAdminForgotPasswordStrategy>(
      'AdminForgotPasswordStrategy',
      {
        useClass: AdminForgotPasswordStrategy,
      }
    )

    container.register<ICustomerForgotPasswordStrategy>(
      'CustomerForgotPasswordStrategy',
      {
        useClass: CustomerForgotPasswordStrategy,
      }
    )

    container.register<IVendorForgotPasswordStrategy>(
      'VendorForgotPasswordStrategy',
      {
        useClass: VendorForgotPasswordStrategy,
      }
    )

    container.register<ICustomerResetPasswordStrategy>(
      'ICustomerResetPasswordStrategy',
      {
        useClass: CustomerResetPasswordStrategy,
      }
    )
    container.register<IVendorResetPasswordStrategy>(
      'IVendorResetPasswordStrategy',
      {
        useClass: VendorResetPasswordStrategy,
      }
    )
    container.register<IAdminResetPasswordStrategy>(
      'IAdminResetPasswordStrategy',
      {
        useClass: AdminResetPasswordStrategy,
      }
    )

    container.register<IVendorProfileStrategy>('IVendorProfileStrategy', {
      useClass: VendorProfileStrategy,
    })

    container.register<ICustomerProfileStrategy>('ICustomerProfileStrategy', {
      useClass: CustomerProfileStrategy,
    })

    container.register<IVendorProfileUpdateStrategy>(
      'IVendorProfileUpdateStrategy',
      {
        useClass: VendorProfileUpdateStrategy,
      }
    )

    container.register<ICustomerProfileUpdateStrategy>(
      'ICustomerProfileUpdateStrategy',
      {
        useClass: CustomerProfileUpdateStrategy,
      }
    )

    container.register<IFetchingCustomersStrategy>(
      'IFetchingCustomersStrategy',
      {
        useClass: FetchingCustomersStrategy,
      }
    )

    container.register<IFetchingVendorsStrategy>('IFetchingVendorsStrategy', {
      useClass: FetchingVendorsStrategy,
    })

    container.register<IChangeMyCustomersBlockStatusStrategy>(
      'IChangeMyCustomersBlockStatusStrategy',
      {
        useClass: ChangeMyCustomersBlockStatusStrategy,
      }
    )

    container.register<IChangeMyVendorsBlockStatusStrategy>(
      'IChangeMyVendorsBlockStatusStrategy',
      {
        useClass: ChangeMyVendorsBlockStatusStrategy,
      }
    )
  }
}
