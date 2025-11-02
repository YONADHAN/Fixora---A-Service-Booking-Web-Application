'use client'

import React from 'react'
import ProfileCard from '@/components/shared-ui/Cards/ProfileCard'

const CustomerProfilePage = () => {
  const customerData = {
    id: '7c2-472c-a0a2-bc834952bb4f',
    name: 'Yonadhan MM',
    email: 'yonadhanmm77@gmail.com',
    role: 'Customer',
    phone: '9349474463',
    status: 'Active',
    location: {
      name: 'ചങ്ങനാശ്ശേരി റെയിൽവേ സ്റ്റേഷൻ',
      displayName:
        'ചങ്ങനാശ്ശേരി റെയിൽവേ സ്റ്റേഷൻ, Perunna, Changanassery, കോട്ടയം ജില്ല, Kerala, India',
      zipCode: '686105',
    },
    createdAt: '2025-11-01T10:20:55.619Z',
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-6'>
      <ProfileCard user={customerData} />
    </div>
  )
}

export default CustomerProfilePage
