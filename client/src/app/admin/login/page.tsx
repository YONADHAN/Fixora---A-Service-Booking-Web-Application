import { LoginForm } from '@/components/login-form'

export default function page() {
  return (
    <div className=' flex flex-col items-center justify-center p-5 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <LoginForm />
      </div>
    </div>
  )
}
