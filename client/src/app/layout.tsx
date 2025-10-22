'use client'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { usePathname } from 'next/navigation'
import QueryProvider from './providers/QueryProvider'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Only show Navbar/Footer for non-admin/vendor routes
  const showSharedLayout =
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/vendor') &&
    !pathname.startsWith('/customer')

  return (
    <html lang='en'>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position='top-right' reverseOrder={false} />
            {showSharedLayout && (
              <Navbar role='customer' isAuthenticated={true} />
            )}
            <main>{children}</main>
            {showSharedLayout && <Footer />}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
