export interface IForgotPasswordUseCase {
  execute(params: { email: string; role: string }): Promise<void>
}
