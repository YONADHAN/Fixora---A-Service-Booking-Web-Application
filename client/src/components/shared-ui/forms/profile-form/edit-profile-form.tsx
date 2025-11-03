'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const MapSelector = dynamic(() => import('@/utils/helpers/MapSelector'), {
  ssr: false,
})

// Define proper types
interface Location {
  name: string
  displayName: string
  zipCode: string
}

interface User {
  name: string
  email: string
  phone: string
  location: Location
}

interface FormData {
  name: string
  email: string
  phone: string
  location: Location
}

interface EditProfileFormProps {
  user: User
  role: string
  onSubmit: (formData: FormData) => void // Changed: accepts formData, not event
  onCancel: () => void // Changed: no parameters needed
  isPending: boolean
}

export const EditProfileForm = ({
  user,
  role,
  onSubmit,
  onCancel,
  isPending,
}: EditProfileFormProps) => {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: {
      name: user?.location?.name || '',
      displayName: user?.location?.displayName || '',
      zipCode: user?.location?.zipCode || '',
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('location.')) {
      const key = name.split('.')[1] as keyof Location
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleLocationSelect = (
    lat: number,
    lng: number,
    name?: string,
    displayName?: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        name: name || 'Selected Location',
        displayName: displayName || `${lat}, ${lng}`,
        zipCode: prev.location.zipCode,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData) // Pass formData, not event
  }

  return (
    <form onSubmit={handleSubmit} className='p-6 space-y-6 text-gray-700'>
      {/* Basic Info */}
      <div>
        <label className='block text-sm font-medium mb-1'>Name</label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 outline-none'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Email</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          disabled
          className='w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed'
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Phone</label>
        <input
          type='text'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 outline-none'
        />
      </div>

      {/* Map Integration */}
      <div>
        <label className='block text-sm font-medium mb-2'>
          Select Your Location
        </label>
        {mounted && (
          <div className='h-96 w-full rounded-lg overflow-hidden border'>
            <MapSelector onLocationSelect={handleLocationSelect} />
          </div>
        )}
      </div>

      {/* Optional Zip Field */}
      <div>
        <label className='block text-sm font-medium mb-1'>Zip Code</label>
        <input
          type='text'
          name='location.zipCode'
          value={formData.location.zipCode}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 outline-none'
        />
      </div>

      {/* Selected Location Display */}
      <div className='bg-gray-50 p-3 rounded-lg border text-sm text-gray-600'>
        <p>
          <strong>Selected Location:</strong>{' '}
          {formData.location.displayName || 'No location selected'}
        </p>
      </div>

      {/* Buttons */}
      <div className='flex justify-end gap-3 pt-4'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors'
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isPending}
          className='px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
