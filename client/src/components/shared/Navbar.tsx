'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import { useAdminLogout } from '@/lib/hooks/useAdmin'
import { useVendorLogout } from '@/lib/hooks/useVendor'
import { useCustomerLogout } from '@/lib/hooks/useCustomer'
import { Menu } from 'lucide-react'
import { BiSolidBell } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { customerLogout } from '@/store/slices/customer.slice'
import { vendorLogout } from '@/store/slices/vendor.slice'
import { adminLogout } from '@/store/slices/admin.slice'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ModeToggle } from '../ui/modeToggle'

import { navData } from '../data/NavData'
import { toast } from 'sonner'

interface NavbarProps {
  role?: 'admin' | 'vendor' | 'customer'
  isAuthenticated: boolean
}

export default function Navbar({
  role = 'customer',
  isAuthenticated,
}: NavbarProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { topNav, sideNav } = navData[role]

  const customerLogoutHook = useCustomerLogout()
  const vendorLogoutHook = useVendorLogout()
  const adminLogoutHook = useAdminLogout()

  const logoutActions = {
    admin: adminLogoutHook,
    customer: customerLogoutHook,
    vendor: vendorLogoutHook,
  } as const

  const onLogout = async () => {
    try {
      // Select correct logout hook dynamically
      const logoutHook = logoutActions[role]
      if (!logoutHook) {
        toast.error('Invalid role logout')
        return
      }

      // Call mutateAsync from correct hook
      const res = await logoutHook.mutateAsync()

      if (!res) {
        toast.error('Failed to logout')
        return
      }

      // Clear redux state
      switch (role) {
        case 'admin':
          dispatch(adminLogout())
          break
        case 'vendor':
          dispatch(vendorLogout())
          break
        case 'customer':
          dispatch(customerLogout())
          break
      }

      toast.success(res?.data?.message || 'Logged out successfully')
      router.push(`/${role}/sigin`)
    } catch (error) {
      toast.error('Logout failed')
      console.error(error)
    }
  }

  return (
    <header className='w-full shadow-md sticky top-0 z-50 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16'>
        {/* Left Section */}
        <div className='flex items-center gap-3'>
          {/* Mobile Menu - Always show on mobile */}
          <Sheet>
            <SheetTrigger asChild className='md:hidden px-2'>
              <Button variant='ghost' size='icon'>
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-64'>
              <SheetHeader>
                <SheetTitle>
                  Fixora {role.charAt(0).toUpperCase() + role.slice(1)}
                </SheetTitle>
              </SheetHeader>

              <nav className='mt-6 flex flex-col gap-4'>
                {/* Show top nav items on mobile */}
                <div className='flex flex-col gap-4 pb-4 border-b'>
                  {topNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='text-lg font-medium hover:text-blue-600'
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Show side nav items if authenticated */}
                {isAuthenticated && sideNav.length > 0 && (
                  <div className='flex flex-col gap-4'>
                    {sideNav.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className='flex items-center gap-2 text-lg font-medium hover:text-blue-600'
                        >
                          <Icon />
                          {item.title}
                        </Link>
                      )
                    })}
                  </div>
                )}

                {/* Auth buttons for mobile */}
                <div className='mt-4 flex flex-col gap-3'>
                  {isAuthenticated ? (
                    <Button
                      variant='destructive'
                      onClick={onLogout}
                      className='w-full'
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant='outline'
                        onClick={() => router.push(`/${role}/signin`)}
                        className='w-full'
                      >
                        Login
                      </Button>
                      {role !== 'admin' && (
                        <Button
                          onClick={() => router.push(`/${role}/signup`)}
                          className='w-full'
                        >
                          Sign Up
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Sidebar - Only show if authenticated */}
          {isAuthenticated && (
            <Sheet>
              <SheetTrigger asChild className='hidden md:block px-2'>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-6 w-6' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-64'>
                <SheetHeader>
                  <SheetTitle>
                    Fixora {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SheetTitle>
                </SheetHeader>

                <nav className='mt-6 ml-2 flex flex-col gap-4'>
                  {sideNav.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className='flex items-center gap-2 text-lg font-medium hover:text-blue-600'
                      >
                        <Icon />
                        {item.title}
                      </Link>
                    )
                  })}
                  <Button
                    variant='destructive'
                    onClick={onLogout}
                    className='absolute bottom-5 w-44'
                  >
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link
            href='/'
            className='text-xl font-bold text-gray-800 dark:text-white'
          >
            Fixora
          </Link>
        </div>

        {/* Center (Top Nav for desktop) */}
        <nav className='hidden md:flex space-x-6'>
          {topNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='hover:text-blue-600 dark:text-gray-200'
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right: Auth Buttons + Dark Mode */}
        <div className='flex items-center gap-4'>
          <ModeToggle />

          {isAuthenticated ? (
            <>
              <Button variant='outline' className='relative hidden sm:flex'>
                <div className='w-3 h-3 rounded-full bg-green-500 absolute top-0.5 right-1.5'></div>
                <BiSolidBell />
              </Button>
              <Button
                variant='destructive'
                onClick={onLogout}
                className='hidden md:flex'
              >
                Logout
              </Button>
            </>
          ) : (
            <div className='flex place-items-center gap-2'>
              <Button
                variant='outline'
                onClick={() => router.push(`/${role}/signin`)}
                className='hidden sm:flex'
              >
                Login
              </Button>
              {role !== 'admin' && (
                <Button
                  onClick={() => router.push(`/${role}/signup`)}
                  className='px-3 py-1'
                >
                  Sign Up
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
