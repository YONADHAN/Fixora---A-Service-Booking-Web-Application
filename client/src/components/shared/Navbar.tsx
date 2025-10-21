'use client'

import React, { ComponentType } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import {
  FaHome,
  FaUser,
  FaUsers,
  FaStore,
  FaChartLine,
  FaClipboardList,
  FaTasks,
  FaCheckCircle,
  FaComments,
  FaStar,
  FaWallet,
  FaMapMarkerAlt,
  FaCreditCard,
  FaLock,
} from 'react-icons/fa'
import { BiSolidBell } from 'react-icons/bi'
import { Menu } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ModeToggle } from '../ui/modeToggle'

interface NavItem {
  title: string
  href: string
}

interface NavbarProps {
  role?: 'admin' | 'vendor' | 'customer'
  isAuthenticated: boolean
}

interface SideBarItem {
  title: string
  href: string
  icon: ComponentType
}

const roleBasedMenu: Record<string, NavItem[]> = {
  admin: [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Pending Approvals', href: '/admin/pending_approvals' },
    { title: 'Recharge Plans', href: '/admin/recharge_plans' },
  ],
  vendor: [
    { title: 'Dashboard', href: '/vendor/dashboard' },
    { title: 'Requests', href: '/vendor/requests' },
    { title: 'Time Shedules', href: '/vendor/time_shedules' },
    { title: 'Pending Works', href: '/vendor/pending_works' },
  ],
  customer: [
    { title: 'Services', href: '/' },
    { title: 'About Us', href: '/customer/about_us' },
    { title: 'Profile', href: '/customer/profile' },
  ],
}
const roleBasedSideBarMenu: Record<string, SideBarItem[]> = {
  admin: [
    { title: 'Dashboard', href: '/admin/dashboard', icon: FaHome },
    { title: 'Customers', href: '/admin/customers', icon: FaUsers },
    { title: 'Vendors', href: '/admin/vendors', icon: FaStore },
    { title: 'Services', href: '/admin/services', icon: FaHome },
    {
      title: 'Recharge Plans',
      href: '/admin/recharge_plans',
      icon: FaCreditCard,
    },
    {
      title: 'Revenue Reports',
      href: '/admin/revenue_reports',
      icon: FaChartLine,
    },
    {
      title: 'Pending Approvals',
      href: '/admin/pending_approvals',
      icon: FaClipboardList,
    },
    { title: 'Notifications', href: '/admin/notifications', icon: BiSolidBell },
  ],
  vendor: [
    { title: 'Dashboard', href: '/vendor/dashboard', icon: FaHome },
    { title: 'Time Schedules', href: '/vendor/time_shedules', icon: FaTasks },
    { title: 'Requests', href: '/vendor/requests', icon: BiSolidBell },
    { title: 'Customers', href: '/vendor/customers', icon: FaUsers },
    {
      title: 'Pending Works',
      href: '/vendor/pending_works',
      icon: FaClipboardList,
    },
    {
      title: 'Finished Works',
      href: '/vendor/finished_works',
      icon: FaCheckCircle,
    },
    { title: 'Chats', href: '/vendor/chats', icon: FaComments },
    {
      title: 'Ratings and Reviews',
      href: '/vendor/ratings_and_reviews',
      icon: FaStar,
    },
    { title: 'Profile', href: '/vendor/profile', icon: FaUser },
    { title: 'Change Password', href: '/vendor/change_password', icon: FaLock },
    {
      title: 'Notifications',
      href: '/vendor/notifications',
      icon: BiSolidBell,
    },
  ],
  customer: [
    { title: 'Services', href: '/customer/services', icon: FaHome },
    { title: 'Profile', href: '/customer/profile', icon: FaUser },
    { title: 'Chats', href: '/customer/chats', icon: FaComments },
    { title: 'Wallet', href: '/customer/wallet', icon: FaWallet },
    { title: 'Address', href: '/customer/address', icon: FaMapMarkerAlt },
    { title: 'Payments', href: '/customer/payments', icon: FaCreditCard },
    {
      title: 'Change Password',
      href: '/customer/change_password',
      icon: FaLock,
    },
    {
      title: 'Notifications',
      href: '/customer/notifications',
      icon: BiSolidBell,
    },
  ],
}

export default function Navbar({ role, isAuthenticated }: NavbarProps) {
  const menuItems = role ? roleBasedMenu[role] : roleBasedMenu.customer
  const sidebarItems = role
    ? roleBasedSideBarMenu[role]
    : roleBasedSideBarMenu.customer
  const router = useRouter()

  function onLogout() {
    console.log('Logout clicked')
    //  logout logic
  }

  return (
    <header className='w-full shadow-md sticky top-0 z-50 '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16'>
        {/* Left: Logo + Hamburger */}
        <div className='flex items-center gap-3 relative'>
          {isAuthenticated && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-6 w-6' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-64'>
                <SheetHeader>
                  <SheetTitle>
                    Fixora{' '}
                    {role ? role.charAt(0).toUpperCase() + role.slice(1) : ''}{' '}
                  </SheetTitle>
                </SheetHeader>
                <nav className='mt-6 ml-2 flex flex-col gap-4 '>
                  {sidebarItems.map((item) => {
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

          {/* Logo */}
          <Link href='/' className='text-xl font-bold text-gray-800'>
            Fixora
          </Link>
        </div>

        {/* Desktop Menu Items */}
        <nav className='hidden md:flex space-x-6'>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='hover:text-blue-600'
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className='flex items-center gap-4'>
          <div>
            <ModeToggle />
          </div>
          {isAuthenticated ? (
            <>
              <Button variant='outline' className='relative'>
                <div className='w-3 h-3 rounded-full bg-green-500 absolute top-0.5 right-1.5'></div>
                <BiSolidBell />
              </Button>
              <Button variant='destructive' onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant='outline' onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button onClick={() => router.push('/signup')}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
