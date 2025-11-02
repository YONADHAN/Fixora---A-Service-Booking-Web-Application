'use client'

import React from 'react'
import { Mail, Phone, MapPin, Calendar, User, Pencil } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ProfileCard = ({ user }) => {
  const router = useRouter()

  if (!user) return null

  const handleEdit = () => {
    router.push(`/customer/profile/edit`)
  }

  return (
    <div className='w-full max-w-lg bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden transition-all hover:shadow-2xl'>
      {/* Header */}
      <div className='relative bg-gradient-to-r from-slate-800 via-slate-700 to-gray-800 text-white p-6 flex flex-col items-center'>
        <div className='relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md'>
          <Image
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
            alt='avatar'
            fill
            unoptimized
            className='object-cover'
          />
        </div>

        <h1 className='mt-4 text-2xl font-semibold'>{user.name}</h1>
        <p className='text-gray-300 text-sm capitalize'>{user.role}</p>

        <p
          className={`mt-1 text-sm font-medium ${
            user.status === 'Active' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          ● {user.status}
        </p>

        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className='absolute top-4 right-4 flex items-center gap-1 text-sm font-medium bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-all backdrop-blur-sm'
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      {/* Info Section */}
      <div className='p-6 bg-gray-50 text-gray-700 space-y-4 text-sm'>
        {user.email && (
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-md bg-gray-100'>
              <Mail size={18} className='text-gray-500' />
            </div>
            <span>{user.email}</span>
          </div>
        )}

        {user.phone && (
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-md bg-gray-100'>
              <Phone size={18} className='text-gray-500' />
            </div>
            <span>{user.phone}</span>
          </div>
        )}

        {user.location && (
          <div className='flex items-start gap-3'>
            <div className='p-2 rounded-md bg-gray-100 mt-1'>
              <MapPin size={18} className='text-gray-500' />
            </div>
            <div>
              <p className='font-medium'>{user.location.name}</p>
              <p className='text-gray-500 text-xs'>
                {user.location.displayName}
              </p>
            </div>
          </div>
        )}

        {user.createdAt && (
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-md bg-gray-100'>
              <Calendar size={18} className='text-gray-500' />
            </div>
            <span>
              Joined on{' '}
              {new Date(user.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      {user.id && (
        <div className='bg-gray-100 text-gray-600 text-xs px-6 py-3 border-t border-gray-200 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <User size={14} className='text-gray-400' />
            <span className='font-medium'>User ID:</span>
          </div>
          <span className='text-gray-500'>{user.id}</span>
        </div>
      )}
    </div>
  )
}

export default ProfileCard
