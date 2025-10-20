import { CustomError } from '../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constants'
import { inject, injectable } from 'tsyringe'
import chalk from 'chalk'
import { ISendOtpEmailUseCase } from '../../../domain/useCaseInterfaces/auth/sent_otp_usecase_interface'
import { IUserExistenceService } from '../../../domain/serviceInterfaces/user_existence_service.interface'
import { IBcrypt } from '../../../presentation/security/bcrypt_interface'
import { IEmailService } from '../../../domain/serviceInterfaces/email_service_interface'
import { IOtpService } from '../../../domain/serviceInterfaces/otp_service_interface'
@injectable()
export class sendOtpEmailUseCase implements ISendOtpEmailUseCase {
  constructor(
    @inject('IOtpService') private _otpService: IOtpService,
    @inject('IUserExistenceService')
    private _userExistenceService: IUserExistenceService,
    @inject('IOtpBcrypt') private _otpBcrypt: IBcrypt,
    @inject('IEmailService') private _emailService: IEmailService
  ) {}

  async execute(email: string): Promise<void> {
    const emailExists = await this._userExistenceService.emailExists(email)
    if (emailExists) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT)
    }
    const otp = this._otpService.generateOtp()
    console.log(chalk.yellowBright.bold(`OTP:`), chalk.bgGreenBright.bold(otp))
    const hashedOtp = await this._otpBcrypt.hash(otp)
    await this._otpService.storeOtp(email, hashedOtp)
    await this._emailService.sendOtpEmail(
      email,
      'Fixora - verify your Email',
      otp
    )
  }
}
