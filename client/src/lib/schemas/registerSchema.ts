// import { z } from 'zod'

// export const registerSchema = z.object({
//   name: z.string().min(3, 'Username must be at least 3 characters.'),
//   email: z.string().email('Invalid email validation'),
//   password: z
//     .string()
//     .min(8, { message: 'Password must be at least 8 characters long' })
//     .regex(/[A-Z]/, {
//       message: 'Password must contain at least one uppercase letter',
//     })
//     .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
//     .regex(/[@$!%*?&#]/, {
//       message: 'Password must contain at least one special character (@$!%*?&)',
//     }),
//   phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),

//   // ✅ Matches backend "geoLocation" { type, coordinates }
//   geoLocation: z
//     .object({
//       type: z.literal('Point'),
//       coordinates: z
//         .array(z.number())
//         .length(2, 'Coordinates must contain [lng, lat]'),
//     })
//     .optional(),

//   // ✅ Matches backend "location" { name, displayName, zipCode }
//   location: z
//     .object({
//       name: z.string().optional(),
//       displayName: z.string().optional(),
//       zipCode: z.string().min(5, 'Zipcode is required'),
//     })
//     .optional(),

//   avatar: z.instanceof(File).optional(),
//   idProof: z.instanceof(File).optional(),
// })

// export type RegisterFormData = z.infer<typeof registerSchema>
// lib/schemas/registerSchema.ts
import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .regex(/[@$!%*?&#]/, {
      message:
        'Password must contain at least one special character (@$!%*?&#)',
    }),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),

  // Location data for the form
  location: z.object({
    name: z.string().min(1, 'Location name is required'),
    displayName: z.string().min(1, 'Display name is required'),
    zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
    lat: z.number(),
    lng: z.number(),
  }),

  zipcode: z.string().min(5, 'Zip code must be at least 5 characters'),
  // avatar: z.instanceof(File).optional(),
  // idProof: z.instanceof(File).optional(),
})

// Type for form data
export type RegisterFormData = z.infer<typeof registerSchema>

// Type for backend payload
export interface RegisterPayload {
  name: string
  email: string
  password: string
  phone: string
  role: 'customer' | 'vendor'
  googleId?: string
  geoLocation: {
    type: 'Point'
    coordinates: [number, number] // [lng, lat]
  }
  location: {
    name: string
    displayName: string
    zipCode: string
  }
  // avatar?: File
}

export interface LoginPayload {
  email: string
  password: string
  role: 'admin' | 'vendor' | 'customer'
}

// Helper function to transform form data to backend payload
export const transformToPayload = (
  formData: RegisterFormData,
  role: 'customer' | 'vendor' = 'customer'
): RegisterPayload => {
  return {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    role,
    geoLocation: {
      type: 'Point',
      coordinates: [formData.location.lng, formData.location.lat],
    },
    location: {
      name: formData.location.name,
      displayName: formData.location.displayName,
      zipCode: formData.location.zipCode,
    },
    // avatar: formData.avatar,
  }
}
