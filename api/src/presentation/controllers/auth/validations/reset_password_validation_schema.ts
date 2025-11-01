import z from 'zod'
import { ERROR_MESSAGES } from '../../../../shared/constants'
import { passwordSchema } from '../../../../shared/validations/password_validation'
import { strongEmailRegex } from '../../../../shared/validations/email_validation'

export const resetPasswordValidationSchema = z.object({
  // email: strongEmailRegex,
  password: passwordSchema,
  token: z.string(),
  role: z.enum(['customer', 'admin', 'vendor'], {
    message: ERROR_MESSAGES.INVALID_ROLE,
  }),
})
