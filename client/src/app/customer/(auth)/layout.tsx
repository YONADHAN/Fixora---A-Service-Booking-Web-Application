'use client'

import PublicGuard from '@/components/auth/PublicGuard'

export default function CustomerAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PublicGuard role='customer'>{children}</PublicGuard>
}
