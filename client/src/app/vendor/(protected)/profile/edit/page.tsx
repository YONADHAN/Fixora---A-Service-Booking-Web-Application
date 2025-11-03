'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { queryClient } from '@/lib/queryClient'

import {
  useVendorProfileInfo,
  useVenderProfileInfoUpdate,
} from '@/lib/hooks/useVendor'
import { EditProfileForm } from '@/components/shared-ui/forms/profile-form/edit-profile-form'

const EditVendorProfilePage = () => {
  const router = useRouter()

  const { data, isLoading, isError } = useVendorProfileInfo()

  const { mutate: updateVendorProfile, isPending } =
    useVenderProfileInfoUpdate()

  const handleSubmit = (formData: any) => {
    updateVendorProfile(formData, {
      onSuccess: () => {
        toast.success('Vendor profile updated successfully!')
        queryClient.invalidateQueries({ queryKey: ['vendorProfile'] })
        router.push('/vendor/profile')
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || 'Something went wrong')
        } else {
          toast.error('Failed to update profile')
        }
      },
    })
  }

  const handleCancel = () => {
    router.push('/vendor/profile')
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-500'>
        Loading profile...
      </div>
    )
  }

  if (isError) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        Failed to load profile.
      </div>
    )
  }

  if (!data?.data?.data) {
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-400'>
        No profile data found.
      </div>
    )
  }

  const vendor = data.data.data

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-slate-800 via-slate-700 to-gray-800 text-white p-6 flex items-center justify-between'>
          <h2 className='text-lg md:text-xl font-semibold tracking-wide'>
            Edit Vendor Profile
          </h2>
          <button
            onClick={handleCancel}
            className='flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all backdrop-blur-sm'
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Form */}
        <EditProfileForm
          user={vendor}
          role='vendor'
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isPending={isPending}
        />
      </div>
    </div>
  )
}

export default EditVendorProfilePage
