'use client'

import AuthGuard from '@/components/auth/AuthGuard'

export default function ProtectedCustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthGuard role='customer'>{children}</AuthGuard>
}
