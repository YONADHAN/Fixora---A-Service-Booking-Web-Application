'use client'
import AuthGuard from '@/components/auth/AuthGuard'

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthGuard role='admin'>{children}</AuthGuard>
}
