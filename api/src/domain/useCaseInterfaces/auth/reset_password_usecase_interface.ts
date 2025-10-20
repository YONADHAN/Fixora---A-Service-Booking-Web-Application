export interface IResetPasswordUseCase {
  execute(params: {
    password: string
    role: string
    token: string
  }): Promise<void>
}
