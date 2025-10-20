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
//factory
import { RegistrationStrategyFactory } from '../../application/factories/auth/registration/registration_strategy_factory'
import { IRegistrationStrategyFactory } from '../../application/factories/auth/registration/registration_strategy_factory.interface'
import { LoginStrategyFactory } from '../../application/factories/auth/login/login_strategy_factory'
import { ILoginStrategyFactory } from '../../application/factories/auth/login/login_strategy_factory.interface'
import { ForgotPasswordStrategyFactory } from '../../application/factories/auth/forgot_password/forgot_password_strategy_factory'
import { IForgotPasswordStrategyFactory } from '../../application/factories/auth/forgot_password/forgot_password_strategy_factory.interface'
import { ResetPasswordStrategyFactory } from '../../application/factories/auth/reset_password/reset_password_strategy_factory'
import { IResetPasswordStrategyFactory } from '../../application/factories/auth/reset_password/reset_password_strategy_factory.interface'
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
  }
}
