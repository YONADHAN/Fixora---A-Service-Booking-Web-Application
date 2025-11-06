import { statusTypes } from '../../../../../shared/constants'

export interface IChangeMyVendorsBlockStatusStrategy {
  execute(userId: string, status: statusTypes): Promise<any>
}
