import { injectable } from 'tsyringe'
import { config } from '../../shared/config'
import { IBcrypt } from './bcrypt_interface'
import bcrypt from 'bcryptjs'

@injectable()
export class OtpBcrypt implements IBcrypt {
  async hash(original: string): Promise<string> {
    return bcrypt.hash(original, config.bcryptSaltRounds)
  }
  async compare(current: string, original: string): Promise<boolean> {
    return bcrypt.compare(current, original)
  }
}
