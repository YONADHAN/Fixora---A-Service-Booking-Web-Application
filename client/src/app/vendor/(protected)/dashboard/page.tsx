'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  FaUsers,
  FaClipboardList,
  FaStar,
  FaMoneyBillWave,
} from 'react-icons/fa'

export default function VendorDashboardPage() {
  const router = useRouter()
  const vendor = useSelector((state: RootState) => state.vendor.vendor)

  const vendorName = vendor?.name || 'Vendor'

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-6'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100'>
          Welcome back, {vendorName}
        </h1>

        {/* Overview Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          <Card className='hover:shadow-lg transition'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-blue-600'>
                <FaClipboardList /> Active Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>
                12
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-green-600'>
                <FaUsers /> Completed Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>
                46
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-yellow-500'>
                <FaStar /> Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>
                4.8 ⭐
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-purple-600'>
                <FaMoneyBillWave /> Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>
                ₹15,400
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-10'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100'>
            Quick Actions
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button onClick={() => router.push('/vendor/bookings')}>
              View All Bookings
            </Button>
            <Button
              variant='outline'
              onClick={() => router.push('/vendor/profile')}
            >
              Edit Profile
            </Button>
            <Button
              variant='secondary'
              onClick={() => router.push('/vendor/payments')}
            >
              View Payments
            </Button>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100'>
            Recent Bookings
          </h2>
          <table className='w-full border-collapse text-sm'>
            <thead>
              <tr className='text-left border-b dark:border-gray-700'>
                <th className='p-3'>Customer</th>
                <th className='p-3'>Service</th>
                <th className='p-3'>Date</th>
                <th className='p-3'>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'Rahul Sharma',
                  service: 'AC Repair',
                  date: '2025-10-25',
                  status: 'Completed',
                },
                {
                  name: 'Aditi Menon',
                  service: 'Plumbing',
                  date: '2025-10-27',
                  status: 'Pending',
                },
                {
                  name: 'John Varghese',
                  service: 'House Cleaning',
                  date: '2025-10-28',
                  status: 'Ongoing',
                },
              ].map((b, i) => (
                <tr
                  key={i}
                  className='border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition'
                >
                  <td className='p-3'>{b.name}</td>
                  <td className='p-3'>{b.service}</td>
                  <td className='p-3'>{b.date}</td>
                  <td
                    className={`p-3 font-medium ${
                      b.status === 'Completed'
                        ? 'text-green-600'
                        : b.status === 'Ongoing'
                        ? 'text-yellow-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {b.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
