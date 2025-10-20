import { injectable } from 'tsyringe'
import { config } from '../../shared/config'
import nodemailer from 'nodemailer'
import chalk from 'chalk'
import { IEmailService } from '../../domain/serviceInterfaces/email_service_interface'
import {
  VERIFICATION_MAIL_CONTENT,
  PASSWORD_RESET_MAIL_CONTENT,
} from '../../shared/constants'

@injectable()
export class EmailService implements IEmailService {
  private _transporter

  constructor() {
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.nodemailer.EMAIL_USER,
        pass: config.nodemailer.EMAIL_PASS,
      },
    })
  }

  private async _sendMail(mailOptions: {
    from: string
    to: string
    subject: string
    html: string
  }) {
    const info = await this._transporter.sendMail(mailOptions)
    console.log(chalk.bgGreenBright.bold(`📧Email Sent:`), info.response)
  }

  async sendOtpEmail(to: string, subject: string, otp: string): Promise<void> {
    const mailOptions = {
      from: `"Fixora" <${config.nodemailer.EMAIL_USER}>`,
      to,
      subject,
      html: VERIFICATION_MAIL_CONTENT(otp),
    }
    await this._sendMail(mailOptions)
  }

  async sendResetEmail(
    to: string,
    subject: string,
    resetLink: string
  ): Promise<void> {
    const mailOptions = {
      from: `Fixora <${config.nodemailer.EMAIL_USER}>`,
      to,
      subject,
      html: PASSWORD_RESET_MAIL_CONTENT(resetLink),
    }
    await this._sendMail(mailOptions)
    console.log(
      chalk.bgBlue.italic(`Reset Password Link:`),
      chalk.cyanBright.bold(resetLink)
    )
  }
}
