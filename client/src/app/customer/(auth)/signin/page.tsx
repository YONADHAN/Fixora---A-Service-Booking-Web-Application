'use client'

import { LoginForm } from '@/components/shared-ui/login/login-form'
import type { LoginFormData } from '@/lib/schemas/loginSchema'
import { useSignin } from '@/lib/hooks/useAuth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/store'
import { customerLogin } from '@/store/slices/customer.slice'
import { AxiosError } from 'axios'
export default function CustomerLoginPage() {
  const signinMutation = useSignin()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const handleSubmit = async (data: LoginFormData) => {
    try {
      const response = await signinMutation.mutateAsync({
        ...data,
        role: 'customer',
      })

      if (response.success) {
        dispatch(customerLogin(response.user))
        toast.success('Login successful!')

        router.replace('/customer/dashboard')
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
        <LoginForm role='customer' onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
