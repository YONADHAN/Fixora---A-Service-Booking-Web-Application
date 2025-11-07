'use client'

import AuthGuard from '@/components/auth/AuthGuard'

export default function VendorProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthGuard role='vendor'>{children}</AuthGuard>
}
