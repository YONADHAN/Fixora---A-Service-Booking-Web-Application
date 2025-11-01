'use client'

import { useState, useEffect } from 'react'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

import { Toaster } from 'sonner'
import Providers from './provider'
import StoreProvider from '@/store/StoreProvider'
import ClientLayout from '@/components/layout/shared/ClientLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <html lang='en'>
        <body />
      </html>
    )
  }

  return (
    <html lang='en'>
      <body>
        <StoreProvider>
          <Providers>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {/* <Toaster position='top-right' reverseOrder={false} /> */}
              <Toaster position='top-right' />

              <ClientLayout>{children}</ClientLayout>
            </ThemeProvider>
          </Providers>
        </StoreProvider>
      </body>
    </html>
  )
}
