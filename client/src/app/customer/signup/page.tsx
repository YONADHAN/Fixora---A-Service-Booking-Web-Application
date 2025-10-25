'use client'

import React, { useState } from 'react'
import { RegisterForm } from '@/components/shared-ui/register/register-form'
import { OTPModal } from '@/components/shared-ui/otp/otp-block'
import { useSignup } from '@/lib/hooks/useAuth'
import { useSendOtp } from '@/lib/hooks/useAuth'
import {
  RegisterFormData,
  transformToPayload,
} from '@/lib/schemas/registerSchema'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const defaultLocation = {
  lat: 9.9312,
  lng: 76.2673,
  name: 'Kochi',
  displayName: 'Kochi, Kerala, India',
  zipCode: '682001',
}

export default function CustomerSignupPage() {
  const [otpOpen, setOtpOpen] = useState(false)
  const [formData, setFormData] = useState<RegisterFormData | null>(null)
  const signupMutation = useSignup()
  const sendOtpMutation = useSendOtp()
  const router = useRouter()
  const handleFormSubmit = async (data: RegisterFormData) => {
    setFormData(data)
    //setOtpOpen(true)
    try {
      await sendOtpMutation.mutateAsync(data.email)
      setOtpOpen(true)
      toast.success('OTP sent successfully!')
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error('Failed to send otp.This email is already registered!')
      } else {
        toast.error('Failed to send OTP. Please try again.')
      }
    }
  }

  const handleOtpVerified = async () => {
    if (!formData) return

    try {
      const payload = transformToPayload(formData, 'customer')

      await signupMutation.mutateAsync(payload)
      toast.success('Signup successful!')
      router.push('/customer/signin')
      // Redirect to dashboard or login
      // router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to signup.')
      console.error(error)
    }
  }

  return (
    <div>
      <RegisterForm
        role='customer'
        onSubmit={handleFormSubmit}
        defaultLocation={defaultLocation}
      />

      {formData && (
        <OTPModal
          open={otpOpen}
          setOpen={setOtpOpen}
          onVerified={handleOtpVerified}
          data={{ email: formData.email || '' }}
        />
      )}
    </div>
  )
}
