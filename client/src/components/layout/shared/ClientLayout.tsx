'use client'

import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { RootState } from '@/store/store'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const customer = useSelector((state: RootState) => state.customer.customer)
  const isAuthenticated = !!customer

  const showSharedLayout =
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/vendor') &&
    !pathname.startsWith('/customer')

  return (
    <>
      {showSharedLayout && (
        <Navbar role='customer' isAuthenticated={isAuthenticated} />
      )}
      <main>{children}</main>
      {showSharedLayout && <Footer />}
    </>
  )
}
