'use client'
import React, { useState } from 'react'
import { RegisterForm } from '@/components/shared-ui/register/register-form'
import { customerService } from '@/services/customer.service'
import toast from 'react-hot-toast'
import { type RegisterFormData } from '@/lib/schemas/registerSchema'

export default function CustomerSignupPage() {
  const [location, setLocation] = useState<{
    lat: number
    lng: number
    name?: string
    displayName?: string
  } | null>(null)
  const [formData, setFormData] = useState<RegisterFormData | null>(null)

  const handleSubmit = async (data: RegisterFormData) => {
    setFormData(data)
    await customerService.sendOtp(data.email) // send OTP from parent
  }

  const handleVerified = async () => {
    if (!formData) return

    const payload = {
      ...formData,
      role: 'customer',
      location: formData.location
        ? {
            type: 'Point',
            coordinates: [formData.location.lng, formData.location.lat],
            name: formData.location.name || '',
            displayName: formData.location.displayName || '',
            zipCode: formData.zipcode,
          }
        : null,
    }

    const response = await customerService.signup(payload)
    if (response.success) toast.success('User registered successfully')
    else toast.error('Signup failed: ' + response.message)
  }

  return (
    <div>
      <RegisterForm
        role='customer'
        onSubmit={handleSubmit}
        onVerified={handleVerified}
        location={location}
        setLocation={setLocation}
      />
    </div>
  )
}
