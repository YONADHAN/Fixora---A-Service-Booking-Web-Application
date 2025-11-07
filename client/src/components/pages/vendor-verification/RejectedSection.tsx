'use client'
import React from 'react'
import UploadSection from './UploadSection'

export default function RejectedSection({ reason }: { reason: string }) {
  return (
    <div className='max-w-md mx-auto mt-16 p-6 rounded-2xl shadow bg-white'>
      <h2 className='text-xl font-semibold text-red-600 mb-2'>
        Verification Rejected
      </h2>
      <p className='text-gray-600 mb-4'>
        {reason || 'Your documents were not approved.'}
      </p>
      <p className='text-gray-700 mb-4'>
        Please re-upload valid documents to continue your verification.
      </p>

      <UploadSection />
    </div>
  )
}
