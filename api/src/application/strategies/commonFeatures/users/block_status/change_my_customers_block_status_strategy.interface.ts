import { statusTypes } from '../../../../../shared/constants'

export interface IChangeMyCustomersBlockStatusStrategy {
  execute(userId: string, status: statusTypes): Promise<any>
}
