export interface IForgotPasswordStrategy {
  execute(email: string): Promise<void>
}
