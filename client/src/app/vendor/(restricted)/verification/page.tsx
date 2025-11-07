'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import UploadSection from '@/components/pages/vendor-verification/UploadSection'
import PendingSection from '@/components/pages/vendor-verification/PendingSection'
import RejectedSection from '@/components/pages/vendor-verification/RejectedSection'

export default function VendorVerificationPage() {
  const { vendor } = useSelector((state: RootState) => state.vendor)

  const verificationStatus = vendor?.isVerified?.status // 'pending' | 'accepted' | 'rejected'
  const rejectionReason = vendor?.isVerified?.description || ''

  if (!verificationStatus || verificationStatus === 'pending') {
    return <UploadSection />
  }

  if (verificationStatus === 'rejected') {
    return <RejectedSection reason={rejectionReason} />
  }

  return <PendingSection />
}
