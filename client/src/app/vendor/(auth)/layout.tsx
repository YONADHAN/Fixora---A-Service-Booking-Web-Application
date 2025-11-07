'use client'

import PublicGuard from '@/components/auth/PublicGuard'

export default function VendorAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PublicGuard role='vendor'>{children}</PublicGuard>
}
