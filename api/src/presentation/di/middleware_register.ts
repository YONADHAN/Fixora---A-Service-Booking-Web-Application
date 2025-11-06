import { container } from 'tsyringe'
import { BlockMyUserMiddleware } from '../middleware/block_middleware'

export class MiddlewareRegistry {
  static registerMiddlewares(): void {
    container.registerSingleton(BlockMyUserMiddleware)
  }
}
