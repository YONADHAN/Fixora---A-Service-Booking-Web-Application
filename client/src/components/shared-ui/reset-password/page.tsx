import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
type ResetPasswordProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  role: 'admin' | 'customer' | 'vendor'
}
export default function ResetPassword({
  handleSubmit,
  role,
}: ResetPasswordProps) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950'>
      <div className='mx-auto w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
            Reset Your Password
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
            Enter your current password and the new password you want to set.
          </p>
        </div>

        <form
          className='space-y-6'
          action='#'
          method='POST'
          onSubmit={handleSubmit}
        >
          {/* New Password */}
          <div>
            <Label htmlFor='newPassword'>New Password</Label>
            <Input
              id='newPassword'
              name='newPassword'
              type='password'
              required
              placeholder='Enter new password'
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <Label htmlFor='confirmPassword'>Confirm New Password</Label>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              required
              placeholder='Re-enter new password'
            />
          </div>

          <Button type='submit' className='w-full'>
            Reset Password
          </Button>
        </form>

        <div className='flex justify-center'>
          <Link
            href={`${role}/login`}
            className='text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
            prefetch={false}
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
