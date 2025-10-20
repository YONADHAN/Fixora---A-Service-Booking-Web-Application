import React from 'react'

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='min-h-screen flex items-center justify-center'>
      {children}
    </section>
  )
}
