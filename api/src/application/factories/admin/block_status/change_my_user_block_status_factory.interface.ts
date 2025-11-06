import { statusTypes, TRole } from '../../../../shared/constants'

export interface IChangeMyUserBlockStatusFactory {
  getStrategy(params: {
    role: TRole
    userId: string
    status: statusTypes
  }): Promise<any>
}
