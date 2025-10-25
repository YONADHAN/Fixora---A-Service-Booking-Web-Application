'use client'

import { LoginForm } from '@/components/shared-ui/login/login-form'
import type { LoginFormData } from '@/lib/schemas/loginSchema'
import { useSignin } from '@/lib/hooks/useAuth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CustomerLoginPage() {
  const signinMutation = useSignin()
  const router = useRouter()

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const response = await signinMutation.mutateAsync({
        ...data,
        role: 'customer',
      })

      console.log('Form submitted:', data)
      console.log('Login response:', response)

      if (response.success) {
        toast.success('Login successful!')
        router.push('/customer/dashboard')
      } else {
        toast.error(response.message || 'Login failed')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error?.message || 'Something went wrong')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <LoginForm role='customer' onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
