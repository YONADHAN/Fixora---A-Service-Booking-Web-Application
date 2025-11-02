'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ProfileForm from '@/components/shared-ui/forms/profile-form/profile-form'

const EditProfilePage = () => {
  const router = useRouter()

  const user = {
    name: 'Yonadhan MM',
    email: 'yonadhanmm77@gmail.com',
    phone: '9349474463',
    role: 'Customer',
    status: 'Active',
    googleId: '107512365880000987654',
    avatarSeed: 'Yonadhan',
    location: {
      name: 'ചങ്ങനാശ്ശേരി റെയിൽവേ സ്റ്റേഷൻ',
      displayName:
        'ചങ്ങനാശ്ശേരി റെയിൽവേ സ്റ്റേഷൻ, Perunna, Changanassery, കോട്ടയം ജില്ല, Kerala, India',
    },
  }

  const handleUpdate = (updatedData) => {
    console.log('Updated profile:', updatedData)
    alert('Profile updated successfully!')
    router.push('/customer/profile')
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden'>
        {/* Header Section */}
        <div className='bg-gradient-to-r from-slate-800 via-slate-700 to-gray-800 text-white p-6 flex items-center justify-between'>
          <div className='flex items-center gap-3 justify-between w-full'>
            <h2 className='text-lg md:text-xl font-semibold tracking-wide'>
              Edit Profile
            </h2>
            {/* Back Button */}
            <button
              onClick={() => router.push('/customer/profile')}
              className='flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all backdrop-blur-sm'
            >
              <ArrowLeft size={16} />
              Back to Profile
            </button>
          </div>
        </div>

        {/* Form */}
        <ProfileForm
          initialData={user}
          onSubmit={handleUpdate}
          onCancel={() => router.push('/customer/profile')}
        />
      </div>
    </div>
  )
}

export default EditProfilePage
