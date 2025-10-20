import { config } from '../../shared/config'
import { inject, injectable } from 'tsyringe'
import { IOtpRepository } from '../../domain/repositoryInterfaces/auth/otp_repository.interface'
import { IBcrypt } from '../../presentation/security/bcrypt_interface'
import { IOtpService } from '../../domain/serviceInterfaces/otp_service_interface'

@injectable()
export class OtpService implements IOtpService {
  constructor(
    @inject('IOtpRepository') private _otpRepository: IOtpRepository,
    @inject('IOtpBcrypt') private _otpBcrypt: IBcrypt
  ) {}

  generateOtp(): string {
    return Math.floor(Math.random() * 9000 + 1000).toString()
  }

  async storeOtp(email: string, otp: string): Promise<void> {
    const expiresAt = new Date(
      Date.now() + parseInt(config.OtpExpiry) * 60 * 1000
    )
    await this._otpRepository.save({ email, otp, expiresAt })
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const otpEntry = await this._otpRepository.findLatestOtp(email)
    if (!otpEntry) return false
    if (
      new Date() > otpEntry.expiresAt ||
      !(await this._otpBcrypt.compare(otp, otpEntry.otp))
    ) {
      return false
    }
    await this._otpRepository.delete({ email })
    return true
  }
}
