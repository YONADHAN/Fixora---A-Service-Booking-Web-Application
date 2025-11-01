export interface IBlacklistTokenUseCase {
  execute(token: string): Promise<void>
}
