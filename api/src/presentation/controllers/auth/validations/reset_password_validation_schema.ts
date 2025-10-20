import z from 'zod'
import { ERROR_MESSAGES } from '../../../../shared/constants'
import { passwordSchema } from '../../../../shared/validations/password_validation'

export const resetPasswordValidationSchema = z.object({
  password: passwordSchema,
  token: z.string(),
  role: z.enum(['customer', 'admin', 'vendor'], {
    message: ERROR_MESSAGES.INVALID_ROLE,
  }),
})
