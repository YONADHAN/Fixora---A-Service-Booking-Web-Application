'use client'
import ResetPassword from '@/components/shared-ui/reset-password/page'
import { toast } from "sonner";t'
import { useResetPassword } from '@/lib/hooks/useAuth'
import { useParams } from 'next/navigation'
import { AxiosError } from 'axios'

const Page = () => {
  const resetPassword = useResetPassword()
  const { token } = useParams()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (newPassword !== confirmPassword) {
      toast.error('New Password and Confirm Password must match')
      return
    }

    try {
      const response = await resetPassword.mutateAsync({
        password: newPassword,
        token: token as string,
        role: 'admin',
      })

      toast.success('Password reset successful!')
      console.log(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message)
      }
    }
  }

  return (
    <div>
      <ResetPassword role='admin' handleSubmit={handleSubmit} />
    </div>
  )
}

export default Page
