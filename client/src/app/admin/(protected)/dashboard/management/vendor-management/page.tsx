'use client'

import React, { useState } from 'react'
import { ResponsiveTable } from '@/components/shared-ui/resusable_components/table/table'
import {
  useGetAllVendors,
  useChangeMyUserBlockStatus,
} from '@/lib/hooks/useAdmin'

type StatusType = 'active' | 'blocked'

interface Vendor {
  userId: string
  name: string
  email: string
  role: string
  status: StatusType
  createdAt: string
  updatedAt: string
}

const VendorPage = () => {
  // ------- Pagination & Search -------
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const limit = 10

  // ----------------------- React Query: Fetch Vendors -----------------------
  const { data, isLoading, refetch } = useGetAllVendors({
    page: currentPage,
    limit,
    search: appliedSearch, // 👈 only changes when user clicks Search
    role: 'vendor',
  })

  const vendors: Vendor[] = data?.data?.data || []
  const totalPages = data?.data?.totalPages || 1

  // ----------------------- Dialog State -----------------------
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    item: null as Vendor | null,
    newStatus: 'blocked' as StatusType,
  })

  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  // ----------------------- React Query: Block/Unblock Mutation -----------------------
  const { mutateAsync: changeBlockStatus } = useChangeMyUserBlockStatus({
    role: 'vendor',
    userId: confirmDialog.item?.userId || '',
    status: confirmDialog.newStatus,
  })

  // ----------------------- Handlers -----------------------
  const handleBlockUnblockClick = (item: Vendor) => {
    const newStatus: StatusType =
      item.status === 'active' ? 'blocked' : 'active'
    setConfirmDialog({ isOpen: true, item, newStatus })
  }

  const handleCancelAction = () => {
    setConfirmDialog({ isOpen: false, item: null, newStatus: 'blocked' })
  }

  const updateVendorStatus = async (id: string, newStatus: StatusType) => {
    try {
      setUpdatingItems((prev) => new Set(prev).add(id))
      await changeBlockStatus()
      await refetch()
    } catch (error) {
      console.error(`Error updating vendor status to ${newStatus}:`, error)
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

    await updateVendorStatus(item.userId, newStatus)
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
      render: (item: Vendor) => (
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
      render: (item: Vendor) => {
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
      <ResponsiveTable<Vendor>
        data={vendors}
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
        entityType='vendor'
        columns={columns}
        showLabelsOnMobile
      />
    </div>
  )
}

export default VendorPage
