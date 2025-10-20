import { IOtpEntity } from '../../models/otp_entity'
import { IBaseRepository } from '../base_repository.interface'

export interface IOtpRepository extends IBaseRepository<IOtpEntity> {
  findLatestOtp(email: string): Promise<IOtpEntity | null>
}
