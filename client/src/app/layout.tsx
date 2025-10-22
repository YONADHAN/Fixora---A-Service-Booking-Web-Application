'use client'

import { useState, useEffect } from 'react'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { usePathname } from 'next/navigation'
import Providers from './provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showSharedLayout =
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/vendor') &&
    !pathname.startsWith('/customer')

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render nothing on server to avoid mismatch
    return (
      <html lang='en'>
        <body />
      </html>
    )
  }

  return (
    <html lang='en'>
      <body>
        <Providers>
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
        </Providers>
      </body>
    </html>
  )
}
