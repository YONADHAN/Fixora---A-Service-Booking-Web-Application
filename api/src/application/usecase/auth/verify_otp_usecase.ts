import { inject, injectable } from 'tsyringe'
import { IVerifyOtpUseCase } from '../../../domain/useCaseInterfaces/auth/verify_otp_usecase_interface'
import { IOtpService } from '../../../domain/serviceInterfaces/otp_service_interface'
import { CustomError } from '../../../domain/utils/custom.error'
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constants'

@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(@inject('IOtpService') private _otpService: IOtpService) {}
  async execute({ email, otp }: { email: string; otp: string }): Promise<void> {
    const isOtpValid = await this._otpService.verifyOtp(email, otp)
    if (!isOtpValid)
      throw new CustomError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS.BAD_REQUEST)
  }
}
