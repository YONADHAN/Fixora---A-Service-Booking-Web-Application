import z from 'zod'
import { strongEmailRegex } from '../../../../shared/validations/email_validation'
import { passwordSchema } from '../../../../shared/validations/password_validation'

export const loginSchema = z.object({
  email: strongEmailRegex,
  password: passwordSchema,
  role: z.enum(['admin', 'customer', 'vendor']),
})
