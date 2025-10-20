export interface IResetPasswordStrategy {
  resetPassword(
    email: string,
    newPassword: string,
    token: string
  ): Promise<void>
}
