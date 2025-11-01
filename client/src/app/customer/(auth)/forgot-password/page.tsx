'use client'
import ForgotPassword from '@/components/shared-ui/forgot-password/page'
import { useForgotPassword } from '@/lib/hooks/useAuth'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPassword()

  const handleSubmit = async (email: string) => {
    try {
      const response = await forgotPasswordMutation.mutateAsync({
        email: email.toLowerCase(),
        role: 'customer',
      })

      if (response.data.success) {
        toast.success('Email sent successfully')
      } else {
        toast.error('Email not sent')
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('forgot-password error:', error.message)

        toast.error(error.response?.data?.message)
      } else {
        console.error('Unknown error:', error)
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <div>
      <ForgotPassword role='customer' handleSubmit={handleSubmit} />
    </div>
  )
}

export default ForgotPasswordPage
