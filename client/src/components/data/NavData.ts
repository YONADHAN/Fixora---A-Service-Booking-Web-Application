import {
  FaHome,
  FaUser,
  FaUsers,
  FaStore,
  FaLock,
  FaServicestack,
} from 'react-icons/fa'
import { BiSolidBell } from 'react-icons/bi'
import { HiDocumentSearch } from 'react-icons/hi'
import { User2 } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
}

export interface SideBarItem {
  title: string
  href: string
  icon: React.ComponentType
}

export interface RoleMenus {
  topNav: NavItem[]
  sideNav: SideBarItem[]
}

export const navData: Record<'admin' | 'vendor' | 'customer', RoleMenus> = {
  admin: {
    topNav: [{ title: 'Dashboard', href: '/admin/dashboard' }],
    sideNav: [
      { title: 'Dashboard', href: '/admin/dashboard', icon: FaHome },
      {
        title: 'Customers',
        href: '/admin/dashboard/management/customer-management',
        icon: FaUsers,
      },
      {
        title: 'Vendors',
        href: '/admin/dashboard/management/vendor-management',
        icon: FaStore,
      },
      {
        title: 'Requests',
        href: '/admin/dashboard/management/request-management',
        icon: HiDocumentSearch,
      },
      {
        title: 'Service Categories',
        href: '/admin/dashboard/service/categories',
        icon: FaServicestack,
      },
    ],
  },

  vendor: {
    topNav: [{ title: 'Dashboard', href: '/vendor/dashboard' }],
    sideNav: [
      { title: 'Dashboard', href: '/vendor/dashboard', icon: FaHome },
      { title: 'Profile', href: '/vendor/profile', icon: User2 },

      { title: 'Customers', href: '/vendor/customers', icon: FaUsers },

      {
        title: 'Change Password',
        href: '/vendor/change_password',
        icon: FaLock,
      },
      {
        title: 'Notifications',
        href: '/vendor/notifications',
        icon: BiSolidBell,
      },
    ],
  },

  customer: {
    topNav: [
      { title: 'Services', href: '/' },

      { title: 'Profile', href: '/customer/profile' },
    ],
    sideNav: [{ title: 'Profile', href: '/customer/profile', icon: FaUser }],
  },
}
