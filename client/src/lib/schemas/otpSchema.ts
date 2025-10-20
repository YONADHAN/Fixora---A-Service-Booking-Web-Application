import { z } from 'zod'

export const otpSchema = z.object({
  otp: z
    .string()
    .length(4, { message: 'OTP must be exactly 4 digits' })
    .regex(/^\d{4}$/, { message: 'OTP must contain only numbers' }),
})

export type OtpFormData = z.infer<typeof otpSchema>
