'use client'

import { LoginForm } from '@/components/shared-ui/login/login-form'
import type { LoginFormData } from '@/lib/schemas/loginSchema'
import { useSignin } from '@/lib/hooks/useAuth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { adminLogin } from '@/store/slices/admin.slice'
import { useDispatch } from 'react-redux'

export default function AdminLoginPage() {
  const signinMutation = useSignin()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const customizedData = { ...data, email: data.email.toLowerCase() }
      const response = await signinMutation.mutateAsync({
        ...customizedData,
        role: 'admin',
      })

      if (response.success) {
        dispatch(adminLogin(response.user))
        toast.success('Login successful!')
        router.replace('/admin/dashboard')
      } else {
        toast.error(response.message || 'Login failed')
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Login failed')
        }
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <LoginForm role='admin' onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
