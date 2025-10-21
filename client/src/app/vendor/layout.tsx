import type { Metadata } from 'next'
import VendorLayout from '@/components/layout/VendorLayout'
export const metadata: Metadata = {
  title: 'Admin | Fixora',
  description: 'Admin dashboard layout',
}

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <VendorLayout>{children}</VendorLayout>
}
