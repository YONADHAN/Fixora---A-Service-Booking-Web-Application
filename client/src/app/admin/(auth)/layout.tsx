'use client'

import PublicGuard from '@/components/auth/PublicGuard'

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PublicGuard role='admin'>{children}</PublicGuard>
}
