export interface ICustomerResetPasswordStrategy {
  resetPassword(
    email: string,
    newPassword: string,
    token: string
  ): Promise<void>
}
