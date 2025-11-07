'use client'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { RootState } from '@/store/store'
import AuthLoader from './AuthLoader'

interface PublicGuardProps {
  children: React.ReactNode
  role: 'admin' | 'vendor' | 'customer'
}

export default function PublicGuard({ children, role }: PublicGuardProps) {
  const router = useRouter()

  const { admin } = useSelector((state: RootState) => state.admin)
  const { vendor } = useSelector((state: RootState) => state.vendor)
  const { customer } = useSelector((state: RootState) => state.customer)

  const activeRole = admin
    ? 'admin'
    : vendor
    ? 'vendor'
    : customer
    ? 'customer'
    : null
  const isLoggedIn = Boolean(activeRole)

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(`/${activeRole}/dashboard`)
    }
  }, [isLoggedIn, activeRole, router])

  if (isLoggedIn) return <AuthLoader />

  return <>{children}</>
}
