import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email validation'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one upppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .regex(/[@$!%*&?#^]/, {
      message:
        'Password must contain at least one special character (!@#$%^&*?)',
    }),
})

export type LoginFormData = z.infer<typeof loginSchema>
