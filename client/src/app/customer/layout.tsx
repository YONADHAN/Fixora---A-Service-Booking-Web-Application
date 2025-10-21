import type { Metadata } from 'next'
import CustomerLayout from '@/components/layout/CustomerLayout'
export const metadata: Metadata = {
  title: 'Customer | Fixora',
  description: 'Customer dashboard layout',
}

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CustomerLayout>{children}</CustomerLayout>
}
