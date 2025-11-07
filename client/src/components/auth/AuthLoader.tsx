'use client'

export default function AuthLoader() {
  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-50'>
      <div className='flex flex-col items-center gap-4'>
        <div className='relative'>
          <div className='w-12 h-12 border-4 border-gray-200 rounded-full'></div>
          <div className='w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent absolute top-0 left-0 animate-spin'></div>
        </div>
        <p className='text-gray-600 text-sm font-medium'>
          Verifying credentials...
        </p>
      </div>
    </div>
  )
}
