import { statusTypes, TRole } from '../../../shared/constants'

export interface IChangeMyUserBlockStatusUseCase {
  execute({
    role,
    userId,
    status,
  }: {
    role: TRole
    userId: string
    status: statusTypes
  }): Promise<any>
}
