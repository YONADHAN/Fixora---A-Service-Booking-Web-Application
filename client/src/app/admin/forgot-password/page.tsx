'use client'
import ForgotPassword from '@/components/shared-ui/forgot-password/page'
import { useForgotPassword } from '@/lib/hooks/useAuth'
import toast from 'react-hot-toast'

function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPassword()

  const handleSubmit = async (email: string) => {
    try {
      const response = await forgotPasswordMutation.mutateAsync({
        email,
        role: 'admin',
      })

      if (response.data.success) {
        toast.success('Email sent successfully')
      } else {
        toast.error('Email not sent')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('forgot-password error:', error.message)
        toast.error(error.message)
      } else {
        console.error('Unknown error:', error)
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <div>
      <ForgotPassword handleSubmit={handleSubmit} />
    </div>
  )
}

export default ForgotPasswordPage
