// src/components/layout/navData.ts
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
    topNav: [
      { title: 'Dashboard', href: '/admin/dashboard' },
      // { title: 'Pending Approvals', href: '/admin/pending_approvals' },
      // { title: 'Recharge Plans', href: '/admin/recharge_plans' },
    ],
    sideNav: [
      { title: 'Dashboard', href: '/admin/dashboard', icon: FaHome },
      { title: 'Customers', href: '/admin/customers', icon: FaUsers },
      { title: 'Vendors', href: '/admin/vendors', icon: FaStore },

      // { title: 'Services', href: '/admin/services', icon: FaHome },
      // {
      //   title: 'Recharge Plans',
      //   href: '/admin/recharge_plans',
      //   icon: FaCreditCard,
      // },
      // {
      //   title: 'Revenue Reports',
      //   href: '/admin/revenue_reports',
      //   icon: FaChartLine,
      // },
      // {
      //   title: 'Pending Approvals',
      //   href: '/admin/pending_approvals',
      //   icon: FaClipboardList,
      // },
      // {
      //   title: 'Notifications',
      //   href: '/admin/notifications',
      //   icon: BiSolidBell,
      // },
    ],
  },

  vendor: {
    topNav: [
      { title: 'Dashboard', href: '/vendor/dashboard' },
      // { title: 'Requests', href: '/vendor/requests' },
      // { title: 'Time Schedules', href: '/vendor/time_shedules' },
      // { title: 'Pending Works', href: '/vendor/pending_works' },
    ],
    sideNav: [
      { title: 'Dashboard', href: '/vendor/dashboard', icon: FaHome },
      { title: 'Profile', href: '/vendor/profile', icon: User2 },
      // { title: 'Time Schedules', href: '/vendor/time_shedules', icon: FaTasks },
      // { title: 'Requests', href: '/vendor/requests', icon: BiSolidBell },
      { title: 'Customers', href: '/vendor/customers', icon: FaUsers },
      // {
      //   title: 'Pending Works',
      //   href: '/vendor/pending_works',
      //   icon: FaClipboardList,
      // },
      // {
      //   title: 'Finished Works',
      //   href: '/vendor/finished_works',
      //   icon: FaCheckCircle,
      // },
      // { title: 'Chats', href: '/vendor/chats', icon: FaComments },
      // {
      //   title: 'Ratings and Reviews',
      //   href: '/vendor/ratings_and_reviews',
      //   icon: FaStar,
      // },
      { title: 'Profile', href: '/vendor/profile', icon: FaUser },
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
      // { title: 'About Us', href: '/customer/about_us' },
      { title: 'Profile', href: '/customer/profile' },
    ],
    sideNav: [
      // { title: 'Services', href: '/customer/services', icon: FaHome },
      { title: 'Profile', href: '/customer/profile', icon: FaUser },
      // { title: 'Chats', href: '/customer/chats', icon: FaComments },
      // { title: 'Wallet', href: '/customer/wallet', icon: FaWallet },
      // { title: 'Address', href: '/customer/address', icon: FaMapMarkerAlt },
      // { title: 'Payments', href: '/customer/payments', icon: FaCreditCard },
      // {
      //   title: 'Change Password',
      //   href: '/customer/change_password',
      //   icon: FaLock,
      // },
      // {
      //   title: 'Notifications',
      //   href: '/customer/notifications',
      //   icon: BiSolidBell,
      // },
    ],
  },
}
