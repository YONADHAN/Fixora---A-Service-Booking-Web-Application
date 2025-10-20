export interface IVendorResetPasswordStrategy {
  resetPassword(
    email: string,
    newPassword: string,
    token: string
  ): Promise<void>
}
