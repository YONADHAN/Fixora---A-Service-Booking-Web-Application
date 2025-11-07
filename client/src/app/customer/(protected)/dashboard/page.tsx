'use client'
import { RootState } from '@/store/store'
import React from 'react'
import { FaTools, FaClock, FaCheckCircle, FaWallet } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const DashboardPage = () => {
  const customer = useSelector((state: RootState) => state.customer.customer)

  const customerName = customer?.name || 'Customer'
  const stats = [
    {
      title: 'Active Requests',
      count: 2,
      icon: <FaClock />,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      title: 'Completed Services',
      count: 8,
      icon: <FaCheckCircle />,
      color: 'bg-green-100 text-green-700',
    },
    {
      title: 'Pending Payments',
      count: 1,
      icon: <FaWallet />,
      color: 'bg-red-100 text-red-700',
    },
    {
      title: 'Total Spent',
      count: '₹12,350',
      icon: <FaTools />,
      color: 'bg-blue-100 text-blue-700',
    },
  ]

  const services = [
    {
      id: 'FXR123',
      name: 'AC Repair',
      technician: 'Rahul Verma',
      status: 'In Progress',
      date: 'Oct 25, 2025',
    },
    {
      id: 'FXR124',
      name: 'Plumbing',
      technician: 'Amit Singh',
      status: 'Completed',
      date: 'Oct 21, 2025',
    },
  ]

  return (
    <main className='flex-1 p-8 bg-gray-50 min-h-screen overflow-y-auto'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800'>
          Welcome back, {customerName}
        </h2>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>
          + Book New Service
        </button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        {stats.map((item, index) => (
          <div
            key={index}
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

      {/* Recent Services */}
      <section>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          Recent Service Requests
        </h3>
        <div className='bg-white shadow-md rounded-xl overflow-hidden'>
          <table className='min-w-full text-left'>
            <thead className='bg-gray-100 text-gray-600 uppercase text-sm'>
              <tr>
                <th className='py-3 px-4'>ID</th>
                <th className='py-3 px-4'>Service</th>
                <th className='py-3 px-4'>Technician</th>
                <th className='py-3 px-4'>Status</th>
                <th className='py-3 px-4'>Date</th>
                <th className='py-3 px-4 text-right'>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((srv) => (
                <tr key={srv.id} className='border-b hover:bg-gray-50'>
                  <td className='py-3 px-4'>{srv.id}</td>
                  <td className='py-3 px-4'>{srv.name}</td>
                  <td className='py-3 px-4'>{srv.technician}</td>
                  <td className='py-3 px-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        srv.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {srv.status}
                    </span>
                  </td>
                  <td className='py-3 px-4'>{srv.date}</td>
                  <td className='py-3 px-4 text-right'>
                    <button className='text-blue-600 hover:underline text-sm'>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default DashboardPage
