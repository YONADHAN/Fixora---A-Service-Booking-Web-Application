export interface IEmailService {
  sendOtpEmail(to: string, subject: string, otp: string): Promise<void>
  sendResetEmail(to: string, subject: string, resetLink: string): Promise<void>
}
