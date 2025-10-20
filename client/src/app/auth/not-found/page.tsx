'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthNotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-6'>
      <h1 className='text-6xl font-bold text-gray-900 dark:text-gray-50'>
        401
      </h1>
      <h2 className='mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200'>
        Unauthorized Access
      </h2>
      <p className='mt-2 text-gray-600 dark:text-gray-400 text-center'>
        You don’t have permission to view this page. <br /> Please log in with
        valid credentials.
      </p>

      <div className='mt-6 flex gap-4'>
        <Link href='/auth/login'>
          <Button>Go to Login</Button>
        </Link>
        <Link href='/'>
          <Button variant='outline'>Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
