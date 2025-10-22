'use client'

import { useState } from 'react'
import { LoginForm } from '@/components/shared-ui/login/login-form'
import type { LoginFormData } from '@/lib/schemas/loginSchema'

export default function AdminLoginPage() {
  const [formData, setFormData] = useState<LoginFormData | null>(null)

  const handleSubmit = async (data: LoginFormData) => {
    setFormData(data)
    handleVerified()
    console.log('Form submitted:', data)
    try {
    } catch (error) {}
    // You can add login API call here later
  }

  const handleVerified = async () => {
    if (!formData) return
    console.log('User verified:', formData)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <LoginForm role='admin' onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
