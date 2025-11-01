// 'use client'

// import * as React from 'react'
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from '@/components/ui/input-otp'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { useForm, Controller } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { otpSchema, type OtpFormData } from '@/lib/schemas/otpSchema'
// import { useSendOtp, useVerifyOtp } from '@/lib/hooks/useAuth'
// import { toast } from "sonner";

// type OTPModalProps = {
//   open: boolean
//   setOpen: (val: boolean) => void
//   onVerified: () => void
//   data: { email: string }
// }

// export function OTPModal({ open, setOpen, onVerified, data }: OTPModalProps) {
//   const RESEND_DELAY = 120
//   const [counter, setCounter] = React.useState(RESEND_DELAY)
//   const sendOtpMutation = useSendOtp()
//   const verifyOtpMutation = useVerifyOtp()

//   const otpSentRef = React.useRef(false)

//   React.useEffect(() => {
//     if (!open || !data?.email) return

//     if (otpSentRef.current) return // already sent once
//     otpSentRef.current = true

//     const sendOtp = async () => {
//       try {
//         await sendOtpMutation.mutateAsync(data.email)
//         setCounter(RESEND_DELAY)
//         toast.success('OTP sent successfully!')
//       } catch (err: any) {
//         if (err.response?.status === 409) {
//           toast.error('Failed to send otp.This email is already registered!')
//         } else {
//           toast.error('Failed to send OTP. Please try again.')
//         }

//         // console.error('Failed to send OTP', err)
//         // console.log('respones is =>', JSON.stringify(err))
//         // toast.error('Failed to send OTP.')
//       }
//     }

//     sendOtp()
//   }, [open, data?.email])

//   // 🔁 Reset guard when modal is closed
//   React.useEffect(() => {
//     if (!open) otpSentRef.current = false
//   }, [open])

//   // ⏱ Counter logic
//   React.useEffect(() => {
//     if (counter <= 0) return
//     const interval = setInterval(() => {
//       setCounter((prev) => prev - 1)
//     }, 1000)
//     return () => clearInterval(interval)
//   }, [counter])

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, '0')
//     const s = (seconds % 60).toString().padStart(2, '0')
//     return `${m}:${s}`
//   }

//   const handleResend = async () => {
//     try {
//       await sendOtpMutation.mutateAsync(data.email)
//       setCounter(RESEND_DELAY)
//       toast.success('OTP resent successfully!')
//     } catch (err) {
//       console.error('Failed to resend OTP', err)
//       toast.error('Failed to resend OTP.')
//     }
//   }

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<OtpFormData>({
//     resolver: zodResolver(otpSchema),
//     defaultValues: { otp: '' },
//   })

//   const onSubmit = async (otpData: OtpFormData) => {
//     try {
//       const response = await verifyOtpMutation.mutateAsync({
//         email: data.email,
//         otp: otpData.otp,
//       })

//       if (response.success) {
//         toast.success('OTP Verified Successfully')
//         setOpen(false)
//         onVerified()
//       } else {
//         toast.error(response.message || 'OTP verification failed')
//       }
//     } catch (error) {
//       toast.error('Something went wrong while verifying OTP.')
//       console.error(error)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className='sm:max-w-md'>
//         <DialogHeader className='text-center space-y-2 px-2'>
//           <DialogTitle className='text-2xl font-semibold'>
//             Verify Your Email - Fixora
//           </DialogTitle>
//           <DialogDescription className='text-gray-500'>
//             Enter the 4-digit code we sent to your email.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
//           <div className='flex justify-center py-4'>
//             <Controller
//               control={control}
//               name='otp'
//               render={({ field }) => (
//                 <InputOTP
//                   maxLength={4}
//                   value={field.value}
//                   onChange={field.onChange}
//                 >
//                   <InputOTPGroup className='gap-3'>
//                     {[...Array(4)].map((_, i) => (
//                       <InputOTPSlot
//                         key={i}
//                         index={i}
//                         className='w-10 h-12 text-lg'
//                       />
//                     ))}
//                   </InputOTPGroup>
//                 </InputOTP>
//               )}
//             />
//           </div>

//           {errors.otp && (
//             <p className='text-center text-sm text-red-500'>
//               {errors.otp.message}
//             </p>
//           )}

//           <div className='flex flex-col gap-3 mt-6'>
//             <Button type='submit' className='w-full'>
//               Verify
//             </Button>
//             {counter > 0 ? (
//               <div className='text-sm text-gray-500 text-center'>
//                 Resend OTP in{' '}
//                 <span className='font-medium'>{formatTime(counter)}</span>
//               </div>
//             ) : (
//               <button
//                 type='button'
//                 onClick={handleResend}
//                 className='text-sm text-blue-600 hover:underline'
//               >
//                 Resend OTP
//               </button>
//             )}
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }
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
import { useSendOtp, useVerifyOtp } from '@/lib/hooks/useAuth'
import { toast } from 'sonner'

type OTPModalProps = {
  open: boolean
  setOpen: (val: boolean) => void
  onVerified: () => void
  data: { email: string }
}

export function OTPModal({ open, setOpen, onVerified, data }: OTPModalProps) {
  const RESEND_DELAY = 120
  const [counter, setCounter] = React.useState(RESEND_DELAY)
  const sendOtpMutation = useSendOtp()
  const verifyOtpMutation = useVerifyOtp()

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
      await sendOtpMutation.mutateAsync(data.email)
      setCounter(RESEND_DELAY)
      toast.success('OTP resent successfully!')
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as any).response?.status === 409
      ) {
        toast.error('This email is already registered!')
      } else {
        toast.error('Failed to resend OTP. Please try again.')
      }
      console.error(error)
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
      const response = await verifyOtpMutation.mutateAsync({
        email: data.email,
        otp: otpData.otp,
      })

      if (response.success) {
        toast.success('OTP Verified Successfully')
        setOpen(false)
        onVerified()
      } else {
        toast.error(response.message || 'OTP verification failed')
      }
    } catch (error) {
      toast.error('Something went wrong while verifying OTP.')
      console.error(error)
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
