'use client'

import * as React from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpSchema, type OtpFormData } from '@/lib/schemas/otpSchema'
import { customerService } from '@/services/customer.service'
import toast from 'react-hot-toast'

type OTPModalProps = {
  open: boolean
  setOpen: (val: boolean) => void
  onVerified: () => void
  data: { email: string }
}

export function OTPModal({ open, setOpen, onVerified, data }: OTPModalProps) {
  const RESEND_DELAY = 120
  const [counter, setCounter] = React.useState(RESEND_DELAY)

  React.useEffect(() => {
    if (counter <= 0) return
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [counter])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleResend = async () => {
    try {
      await customerService.sendOtp(data.email)
      setCounter(RESEND_DELAY)
      toast.success('OTP resent successfully!')
      //alert('OTP resent successfully!')
    } catch (err) {
      console.error('Failed to resend OTP', err)
      toast.error('Failed to resend OTP.')
      //alert('Failed to resend OTP.')
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  const onSubmit = async (otpData: OtpFormData) => {
    try {
      if (!data?.email) {
        alert('Email not available for OTP verification.')
        return
      }
      const response = await customerService.verifyOtp(data.email, otpData.otp)

      if (response.success) {
        console.log('OTP verified successfully')
        setOpen(false)
        onVerified()
      } else {
        console.error('OTP verification failed:', response.message)
        alert(response.message || 'OTP verification failed')
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      alert('Something went wrong while verifying OTP.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-center space-y-2 px-2'>
          <DialogTitle className='text-2xl font-semibold'>
            Verify Your Email - Fixora
          </DialogTitle>
          <DialogDescription className='text-gray-500'>
            Enter the 4-digit code we sent to your email.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex justify-center py-4'>
            <Controller
              control={control}
              name='otp'
              render={({ field }) => (
                <InputOTP
                  maxLength={4}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup className='gap-3'>
                    {[...Array(4)].map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className='w-10 h-12 text-lg'
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>

          {errors.otp && (
            <p className='text-center text-sm text-red-500'>
              {errors.otp.message}
            </p>
          )}

          <div className='flex flex-col gap-3 mt-6'>
            <Button type='submit' className='w-full'>
              Verify
            </Button>
            {counter > 0 ? (
              <div className='text-sm text-gray-500 text-center'>
                Resend OTP in{' '}
                <span className='font-medium'>{formatTime(counter)}</span>
              </div>
            ) : (
              <button
                type='button'
                onClick={handleResend}
                className='text-sm text-blue-600 hover:underline'
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
