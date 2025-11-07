'use client'

import VerificationGuard from '@/components/auth/VerificationGuard'

export default function RestrictedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <VerificationGuard role='vendor'>{children}</VerificationGuard>
}
