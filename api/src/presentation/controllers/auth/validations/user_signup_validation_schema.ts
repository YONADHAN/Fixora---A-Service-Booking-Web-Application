import z from 'zod'
import { strongEmailRegex } from '../../../../shared/validations/email_validation'
import { phoneNumberSchema } from '../../../../shared/validations/phone_validation'
import { passwordSchema } from '../../../../shared/validations/password_validation'
import { nameSchema } from '../../../../shared/validations/name_validation'

const adminSchema = z.object({
  email: strongEmailRegex,
  password: passwordSchema,
  phone: phoneNumberSchema,
  name: nameSchema,
  role: z.literal('admin'),
})

export const customerSchema = z.object({
  name: nameSchema,
  email: strongEmailRegex,
  phone: phoneNumberSchema.optional(),
  password: passwordSchema.optional(),
  role: z.literal('customer'),
  googleId: z.string().optional(),
  geoLocation: z
    .object({
      type: z.literal('Point'),
      coordinates: z.array(z.number()),
    })
    .optional(),
  location: z
    .object({
      name: z.string(),
      displayName: z.string(),
      zipCode: z.string(),
    })
    .optional(),
})

const vendorSchema = z.object({
  name: nameSchema,
  email: strongEmailRegex,
  phone: phoneNumberSchema.optional(),
  password: passwordSchema.optional(),
  role: z.literal('vendor'),
  googleId: z.string().optional(),
  geoLocation: z
    .object({
      type: z.literal('Point'),
      coordinates: z.array(z.number()),
    })
    .optional(),
  location: z
    .object({
      name: z.string(),
      displayName: z.string(),
      zipCode: z.string(),
    })
    .optional(),
})

export const userSchema = {
  admin: adminSchema,
  customer: customerSchema,
  vendor: vendorSchema,
}
