import React from 'react'

export default function PendingSection() {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh] text-center'>
      <h2 className='text-2xl font-semibold text-gray-800'>
        Your documents are under review.
      </h2>
      <p className='text-gray-500 mt-2'>
        We’ll notify you once verification is complete.
      </p>
    </div>
  )
}
