'use client'

import React, { useState } from 'react'
import { RegisterForm } from '@/components/shared-ui/register/register-form'
import { RegisterFormData } from '@/lib/schemas/registerSchema'
import { useSignup } from '@/lib/hooks/useAuth'
import toast from 'react-hot-toast'
const exampleLocation = {
  lat: 9.9312, // Latitude of Kochi, Kerala
  lng: 76.2673, // Longitude of Kochi, Kerala
  name: 'Kochi', // Optional short name
  displayName: 'Kochi, Kerala, India', // Optional full display name
}
export default function CustomerSignupPage() {
  const [formData, setFormData] = useState<RegisterFormData | null>(null)
  const [location, setLocation] = useState<{
    lat: number
    lng: number
    name?: string
    displayName?: string
  } | null>(exampleLocation)
  const signupMutation = useSignup()
  const handleSubmit = async (data: RegisterFormData) => {
    setFormData(data)
  }

  const handleVerified = async () => {
    //here we call the api for registration
    try {
      await signupMutation.mutateAsync(formData)
    } catch (error) {
      toast.error('Failed to Signup.')
    }
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
