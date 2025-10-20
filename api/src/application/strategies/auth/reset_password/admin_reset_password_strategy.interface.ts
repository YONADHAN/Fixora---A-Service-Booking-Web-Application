export interface IAdminResetPasswordStrategy {
  resetPassword(
    email: string,
    newPassword: string,
    token: string
  ): Promise<void>
}
