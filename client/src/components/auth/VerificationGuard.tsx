'use client'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { RootState } from '@/store/store'
import AuthLoader from './AuthLoader'

interface VerificationGuardProps {
  children: React.ReactNode
  role: 'vendor'
}

export default function VerificationGuard({
  children,
  role,
}: VerificationGuardProps) {
  const router = useRouter()
  const { vendor } = useSelector((state: RootState) => state.vendor)

  const isLoggedIn = Boolean(vendor)
  const verificationStatus = vendor?.isVerified?.status // 'pending' | 'accepted' | 'rejected'

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(`/${role}/signin`)
      return
    }

    if (isLoggedIn && verificationStatus === 'accepted') {
      router.replace(`/${role}/dashboard`)
      return
    }

    if (isLoggedIn && verificationStatus === 'rejected') {
      router.replace(`/${role}/rejected`)
      return
    }
  }, [isLoggedIn, verificationStatus, role, router])

  if (
    !isLoggedIn ||
    verificationStatus === 'accepted' ||
    verificationStatus === 'rejected'
  ) {
    return <AuthLoader />
  }

  return <>{children}</>
}
