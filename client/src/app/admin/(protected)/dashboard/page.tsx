'use client'
import React from 'react'
import {
  FaUsers,
  FaTools,
  FaMoneyBillWave,
  FaClipboardList,
} from 'react-icons/fa'

const AdminDashboardPage = () => {
  const stats = [
    {
      title: 'Total Vendors',
      count: 14,
      icon: <FaUsers />,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Total Bookings',
      count: 132,
      icon: <FaClipboardList />,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      title: 'Active Vendors',
      count: 9,
      icon: <FaTools />,
      color: 'bg-green-100 text-green-700',
    },
    {
      title: 'Revenue',
      count: '₹1,24,500',
      icon: <FaMoneyBillWave />,
      color: 'bg-purple-100 text-purple-700',
    },
  ]

  const vendors = [
    {
      id: 'VND001',
      name: 'Rahul Verma',
      service: 'AC Repair',
      status: 'Active',
      joined: 'Apr 2024',
      rating: 4.8,
    },
    {
      id: 'VND002',
      name: 'Amit Singh',
      service: 'Plumbing',
      status: 'Inactive',
      joined: 'Jan 2024',
      rating: 4.2,
    },
    {
      id: 'VND003',
      name: 'Neha Sharma',
      service: 'Cleaning',
      status: 'Active',
      joined: 'May 2024',
      rating: 4.6,
    },
  ]

  return (
    <main className='flex-1 p-8 bg-gray-50 min-h-screen overflow-y-auto'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800'>
          Welcome, Admin{' '}
        </h2>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>
          + Add New Vendor
        </button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-10'>
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl shadow-sm ${item.color} flex items-center justify-between`}
          >
            <div>
              <p className='text-sm font-medium'>{item.title}</p>
              <h3 className='text-2xl font-bold mt-2'>{item.count}</h3>
            </div>
            <div className='text-3xl'>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Vendors List */}
      <section className='mb-10'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          Registered Vendors
        </h3>
        <div className='bg-white shadow-md rounded-xl overflow-hidden'>
          <table className='min-w-full text-left'>
            <thead className='bg-gray-100 text-gray-600 uppercase text-sm'>
              <tr>
                <th className='py-3 px-4'>Vendor ID</th>
                <th className='py-3 px-4'>Name</th>
                <th className='py-3 px-4'>Service</th>
                <th className='py-3 px-4'>Status</th>
                <th className='py-3 px-4'>Joined</th>
                <th className='py-3 px-4'>Rating</th>
                <th className='py-3 px-4 text-right'>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className='border-b hover:bg-gray-50'>
                  <td className='py-3 px-4'>{v.id}</td>
                  <td className='py-3 px-4 font-medium'>{v.name}</td>
                  <td className='py-3 px-4'>{v.service}</td>
                  <td className='py-3 px-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        v.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className='py-3 px-4'>{v.joined}</td>
                  <td className='py-3 px-4'>{v.rating}⭐</td>
                  <td className='py-3 px-4 text-right'>
                    <button className='text-blue-600 hover:underline text-sm mr-2'>
                      View
                    </button>
                    <button className='text-red-600 hover:underline text-sm'>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* System Summary */}
      <section>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          System Overview
        </h3>
        <div className='bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-semibold mb-2'>Pending Approvals</h4>
            <p className='text-gray-600 text-sm'>
              3 new vendors are awaiting approval.
            </p>
          </div>
          <div>
            <h4 className='font-semibold mb-2'>Recent Activity</h4>
            <ul className='text-gray-600 text-sm list-disc list-inside'>
              <li>
                Vendor <b>Rahul Verma</b> completed 5 jobs this week.
              </li>
              <li>
                Customer complaints resolved: <b>12</b>
              </li>
              <li>
                New booking requests today: <b>6</b>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminDashboardPage
