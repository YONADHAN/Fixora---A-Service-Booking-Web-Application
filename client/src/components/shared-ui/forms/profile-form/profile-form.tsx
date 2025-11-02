'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin, Camera } from 'lucide-react'

const ProfileForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e) => {
    setFormData((prev) => ({ ...prev, avatarSeed: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='p-6 space-y-6'>
      {/* Avatar Section */}
      <div className='flex flex-col items-center text-center'>
        <div className='relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 shadow-md mb-3'>
          <Image
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
              formData.avatarSeed || formData.name || 'user'
            }`}
            alt='avatar'
            fill
            unoptimized
            className='object-cover'
          />
        </div>

        <div className='flex items-center gap-2'>
          <Camera size={18} className='text-gray-500' />
          <input
            type='text'
            name='avatarSeed'
            value={formData.avatarSeed || ''}
            onChange={handleAvatarChange}
            className='border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none'
            placeholder='Enter avatar seed'
          />
        </div>
        <p className='text-xs text-gray-500 mt-1'>
          Change the seed name to generate a new avatar
        </p>
      </div>

      {/* Info Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {/* Name */}
        <div>
          <label className='text-sm text-gray-600 font-medium'>Full Name</label>
          <input
            type='text'
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
            className='mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-400 focus:outline-none'
          />
        </div>

        {/* Role (Read-only if exists) */}
        <div>
          <label className='text-sm text-gray-600 font-medium'>Role</label>
          <input
            type='text'
            name='role'
            value={formData.role || ''}
            onChange={handleChange}
            readOnly={!!formData.role}
            className={`mt-1 w-full border rounded-lg px-3 py-2 ${
              formData.role
                ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                : 'border-gray-300 focus:ring-2 focus:ring-slate-400'
            }`}
          />
        </div>

        {/* Email (Read-only if exists) */}
        <div>
          <label className='text-sm text-gray-600 font-medium'>Email</label>
          <div className='relative mt-1'>
            <Mail
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <input
              type='email'
              name='email'
              value={formData.email || ''}
              onChange={handleChange}
              readOnly={!!formData.email}
              className={`pl-10 w-full border rounded-lg px-3 py-2 ${
                formData.email
                  ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
                  : 'border-gray-300 focus:ring-2 focus:ring-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className='text-sm text-gray-600 font-medium'>Phone</label>
          <div className='relative mt-1'>
            <Phone
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <input
              type='text'
              name='phone'
              value={formData.phone || ''}
              onChange={handleChange}
              className='pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-400 focus:outline-none'
            />
          </div>
        </div>

        {/* Google ID (read-only if exists) */}
        {formData.googleId && (
          <div className='md:col-span-2'>
            <label className='text-sm text-gray-600 font-medium'>
              Google ID
            </label>
            <input
              type='text'
              value={formData.googleId}
              readOnly
              className='mt-1 w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed'
            />
          </div>
        )}

        {/* Location */}
        <div className='md:col-span-2'>
          <label className='text-sm text-gray-600 font-medium'>Location</label>
          <div className='relative mt-1'>
            <MapPin
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <input
              type='text'
              name='locationName'
              value={formData.location?.name || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: { ...prev.location, name: e.target.value },
                }))
              }
              className='pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-400 focus:outline-none'
            />
          </div>
          <textarea
            name='locationDisplay'
            value={formData.location?.displayName || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: { ...prev.location, displayName: e.target.value },
              }))
            }
            rows={2}
            className='mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none'
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-end gap-3 pt-4 border-t border-gray-200'>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all'
          >
            Cancel
          </button>
        )}
        <button
          type='submit'
          className='px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all'
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default ProfileForm
