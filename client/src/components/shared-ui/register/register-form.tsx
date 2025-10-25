'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const MapSelector = dynamic(() => import('@/utils/helpers/MapSelector'), {
  ssr: false,
})

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Location schema
const locationSchema = z.object({
  name: z.string().min(1, 'Location name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
  lat: z.number(),
  lng: z.number(),
})

// Register form schema
export const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  location: locationSchema,
  zipcode: z.string().min(5, 'Zip code must be at least 5 characters'),
  // avatar: z.instanceof(File).optional(),
})

export type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps
  extends Omit<React.ComponentProps<'div'>, 'onSubmit'> {
  role?: 'customer' | 'vendor'
  onSubmit: (data: RegisterFormData) => Promise<void>
  defaultLocation?: {
    lat: number
    lng: number
    name: string
    displayName: string
    zipCode: string
  }
}

export function RegisterForm({
  role = 'customer',
  onSubmit,
  defaultLocation,
  className,
  ...props
}: RegisterFormProps) {
  const [selectedLocation, setSelectedLocation] = useState(
    defaultLocation || null
  )
  const [mounted, setMounted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      location: defaultLocation,
      zipcode: defaultLocation?.zipCode || '',
    },
  })

  useEffect(() => setMounted(true), [])

  // Update form when location is selected
  useEffect(() => {
    if (selectedLocation) {
      setValue('location', selectedLocation, { shouldValidate: true })
      setValue('zipcode', selectedLocation.zipCode, { shouldValidate: true })
    }
  }, [selectedLocation, setValue])

  const handleFormSubmit = async (data: RegisterFormData) => {
    await onSubmit(data)
  }

  const handleLocationSelect = (
    lat: number,
    lng: number,
    name?: string,
    displayName?: string
  ) => {
    const zipcode = watch('zipcode') || ''
    setSelectedLocation({
      lat,
      lng,
      name: name || 'Selected Location',
      displayName: displayName || `${lat}, ${lng}`,
      zipCode: zipcode,
    })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className='p-6 md:p-8'
          >
            <div className='flex flex-col gap-6'>
              {/* Header */}
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>Welcome to Fixora</h1>
                <p className='text-muted-foreground text-balance'>
                  Register your Fixora account
                </p>
              </div>

              {/* Username + Email */}
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='grid gap-2'>
                  <Label htmlFor='username'>Username</Label>
                  <Input
                    id='username'
                    type='text'
                    placeholder='username'
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className='text-sm text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password + Phone */}
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='9876543210'
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className='text-sm text-red-500'>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Zip Code */}
              <div className='grid gap-2'>
                <Label htmlFor='zipcode'>Zip Code</Label>
                <Input
                  id='zipcode'
                  type='text'
                  placeholder='682001'
                  {...register('zipcode')}
                  onChange={(e) => {
                    register('zipcode').onChange(e)
                    if (selectedLocation) {
                      setSelectedLocation({
                        ...selectedLocation,
                        zipCode: e.target.value,
                      })
                    }
                  }}
                />
                {errors.zipcode && (
                  <p className='text-sm text-red-500'>
                    {errors.zipcode.message}
                  </p>
                )}
              </div>

              {/* Location Selector */}
              <div className='grid gap-2'>
                <Label>Select Location on Map</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Input
                      type='text'
                      value={
                        selectedLocation ? selectedLocation.displayName : ''
                      }
                      placeholder='Click to select location on map'
                      readOnly
                      className='cursor-pointer'
                    />
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[600px]'>
                    <DialogHeader>
                      <DialogTitle>Select Location</DialogTitle>
                    </DialogHeader>
                    {mounted && (
                      <div className='h-96 w-full'>
                        <MapSelector onLocationSelect={handleLocationSelect} />
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                {errors.location && (
                  <p className='text-sm text-red-500'>
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Avatar Upload */}
              {/* <div className='grid gap-2'>
                <Label htmlFor='avatar'>Profile Picture (Optional)</Label>
                <Input
                  id='avatar'
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setValue('avatar', file, { shouldValidate: true })
                    }
                  }}
                />
                {errors.avatar && (
                  <p className='text-sm text-red-500'>
                    {errors.avatar.message}
                  </p>
                )}
              </div> */}

              {/* Submit Button */}
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>

              {/* Divider */}
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-card text-muted-foreground relative z-10 px-2'>
                  Or continue with
                </span>
              </div>

              {/* Google Login */}
              <Button
                variant='outline'
                type='button'
                className='w-full flex items-center justify-center gap-2'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='h-5 w-5'
                >
                  <path
                    d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                    fill='currentColor'
                  />
                </svg>
                <span>Login with Google</span>
              </Button>

              {/* Footer link */}
              <div className='text-center text-sm'>
                Already have an account?{' '}
                <a href='#' className='underline underline-offset-4'>
                  Sign in
                </a>
              </div>
            </div>
          </form>

          {/* Image side */}
          <div className='bg-muted relative hidden md:block'>
            <img
              src='/admin/login.jpg'
              alt='Registration'
              className='absolute inset-0 w-full h-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <div className='text-muted-foreground text-center text-xs text-balance'>
        By clicking continue, you agree to our{' '}
        <a href='#' className='underline underline-offset-4 hover:text-primary'>
          Terms of Service
        </a>{' '}
        and{' '}
        <a href='#' className='underline underline-offset-4 hover:text-primary'>
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}
