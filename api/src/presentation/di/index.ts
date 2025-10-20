import { UseCaseRegistry } from './useCase_registry'
import { RepositoryRegistry } from './repository_register'
export class DependencyInjection {
  static registerAll(): void {
    UseCaseRegistry.registerUseCases()
    RepositoryRegistry.registerRepositories()
  }
}
