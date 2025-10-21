import type { Metadata } from 'next'
import AdminLayout from '@/components/layout/AdminLayout'

export const metadata: Metadata = {
  title: 'Admin | Fixora',
  description: 'Admin dashboard layout',
}

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminLayout>{children}</AdminLayout>
}
