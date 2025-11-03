'use client'

import React from 'react'
import ProfileCard from '@/components/shared-ui/Cards/ProfileCard'
import { useCustomerProfileInfo } from '@/lib/hooks/useCustomer'

const CustomerProfilePage = () => {
  const { data, isLoading, isError } = useCustomerProfileInfo()

  if (isLoading)
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-500'>
        Loading profile...
      </div>
    )

  if (isError)
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        Failed to load profile.
      </div>
    )

  if (!data)
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-400'>
        No profile data found.
      </div>
    )
  console.log('The data from backend is ', data.data.data)
  const user = data.data.data

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-6'>
      <ProfileCard user={user} />
    </div>
  )
}

export default CustomerProfilePage
