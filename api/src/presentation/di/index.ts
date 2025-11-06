import { UseCaseRegistry } from './useCase_registry'
import { RepositoryRegistry } from './repository_register'
import { MiddlewareRegistry } from './middleware_register'
export class DependencyInjection {
  static registerAll(): void {
    UseCaseRegistry.registerUseCases()
    RepositoryRegistry.registerRepositories()
    MiddlewareRegistry.registerMiddlewares()
  }
}
