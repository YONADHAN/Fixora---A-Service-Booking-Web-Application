import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Invalid email validation'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .regex(/[@$!%*?&#]/, {
      message: 'Password must contain at least one special character (@$!%*?&)',
    }),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),

  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
      name: z.string().optional(),
      displayName: z.string().optional(),
    })
    .nullable()
    .optional(),

  avatar: z.instanceof(File).optional(),
  zipcode: z.string().min(5, 'Zipcode is required'),
  idProof: z.instanceof(File).optional(),
})

export type RegisterFormData = z.infer<typeof registerSchema>
