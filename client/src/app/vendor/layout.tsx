import type { Metadata } from 'next'
import VendorLayout from '@/components/layout/VendorLayout'
export const metadata: Metadata = {
  title: 'Vendor | Fixora',
  description: 'Vendor pages of Fixora',
}

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <VendorLayout>{children}</VendorLayout>
}
