'use client'

import React, { useState } from 'react'
import { ResponsiveTable } from '@/components/shared-ui/resusable_components/table/table'
import {
  useGetAllCustomers,
  useChangeMyUserBlockStatus,
} from '@/lib/hooks/useAdmin'

type StatusType = 'active' | 'blocked'

interface Customer {
  userId: string
  name: string
  email: string
  role: string
  status: StatusType
  createdAt: string
  updatedAt: string
}

const CustomerPage = () => {
  // ------- Pagination & Search -------
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const limit = 10

  // ----------------------- React Query: Fetch Customers -----------------------
  const { data, isLoading, refetch } = useGetAllCustomers({
    page: currentPage,
    limit,
    search: appliedSearch,
    role: 'customer',
  })

  const customers: Customer[] = data?.data?.data || []
  const totalPages = data?.data?.totalPages || 1

  // ----------------------- Dialog State -----------------------
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    item: null as Customer | null,
    newStatus: 'blocked' as StatusType,
  })

  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  // ----------------------- React Query: Block/Unblock Mutation -----------------------
  const { mutateAsync: changeBlockStatus } = useChangeMyUserBlockStatus({
    role: 'customer',
    userId: confirmDialog.item?.userId || '',
    status: confirmDialog.newStatus,
  })

  // ----------------------- Handlers -----------------------
  const handleBlockUnblockClick = (item: Customer) => {
    const newStatus: StatusType =
      item.status === 'active' ? 'blocked' : 'active'
    setConfirmDialog({ isOpen: true, item, newStatus })
  }

  const handleCancelAction = () => {
    setConfirmDialog({ isOpen: false, item: null, newStatus: 'blocked' })
  }

  const updateCustomerStatus = async (id: string, newStatus: StatusType) => {
    try {
      setUpdatingItems((prev) => new Set(prev).add(id))
      await changeBlockStatus()
      await refetch()
    } catch (error) {
      console.error(`Error updating customer status to ${newStatus}:`, error)
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  const handleConfirmAction = async () => {
    const { item, newStatus } = confirmDialog
    if (!item) return

    await updateCustomerStatus(item.userId, newStatus)
    setConfirmDialog({ isOpen: false, item: null, newStatus: 'blocked' })
  }

  // ----------------------- Search Handlers -----------------------
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchClick = () => {
    setCurrentPage(1)
    setAppliedSearch(searchTerm)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentPage(1)
      setAppliedSearch(searchTerm)
    }
  }

  // ----------------------- Table Columns -----------------------
  const columns = [
    { key: 'userId', header: 'User ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'status',
      header: 'Status',
      render: (item: Customer) => (
        <span
          className={`${
            item.status === 'active' ? 'text-green-600' : 'text-red-500'
          } font-medium`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (item: Customer) => {
        const date = new Date(item.createdAt)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
      },
    },
  ]

  // ----------------------- Render -----------------------
  return (
    <div className='p-6'>
      <ResponsiveTable<Customer>
        data={customers}
        loading={isLoading}
        updatingItems={updatingItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearchKeyPress={handleSearchKeyPress}
        onSearchClick={handleSearchClick}
        onBlockUnblockClick={handleBlockUnblockClick}
        confirmDialog={{
          isOpen: confirmDialog.isOpen,
          item: confirmDialog.item,
          action: confirmDialog.newStatus === 'blocked' ? 'block' : 'unblock',
        }}
        onConfirmAction={handleConfirmAction}
        onCancelAction={handleCancelAction}
        entityType='customer'
        columns={columns}
        showLabelsOnMobile
      />
    </div>
  )
}

export default CustomerPage
