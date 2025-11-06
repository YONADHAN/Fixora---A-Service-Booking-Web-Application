'use client'

import React, { useState, useEffect } from 'react'
import { ResponsiveTable } from '@/components/shared-ui/resusable_components/table/table'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

// -------- Interface --------
interface VendorRequest {
  _id: string
  name: string
  email: string
  status: 'Pending' | 'Verified' | 'Rejected'
  documents: string[]
  [key: string]: unknown
}

// -------- Component --------
const VendorVerificationPage = () => {
  // Dummy Data
  const allVendorRequests: VendorRequest[] = Array.from(
    { length: 24 },
    (_, i) => ({
      _id: `req-${i + 1}`,
      name: `Vendor ${i + 1}`,
      email: `vendor${i + 1}@mail.com`,
      status: i % 3 === 0 ? 'Verified' : i % 3 === 1 ? 'Pending' : 'Rejected',
      documents: ['/admin/login.jpg', '/admin/adminLogin.jpg', '/vercel.svg'],
    })
  )

  // States
  const [vendors, setVendors] = useState<VendorRequest[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVendor, setSelectedVendor] = useState<VendorRequest | null>(
    null
  )
  const [showDialog, setShowDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  const limit = 10
  const totalPages = Math.ceil(allVendorRequests.length / limit)

  // ------- Pagination + Search -------
  useEffect(() => {
    const filtered = allVendorRequests.filter(
      (v) =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const start = (currentPage - 1) * limit
    const end = start + limit
    setVendors(filtered.slice(start, end))
  }, [currentPage, searchTerm])

  // ------- Handlers -------
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setCurrentPage(1)
  }

  const handleViewClick = (vendor: VendorRequest) => {
    setSelectedVendor(vendor)
    setRejectionReason('')
    setShowDialog(true)
  }

  const handleApprove = () => {
    if (!selectedVendor) return
    updateVendorStatus(selectedVendor._id, 'Verified')
    setShowDialog(false)
  }

  const handleReject = () => {
    if (!selectedVendor) return
    if (!rejectionReason.trim()) {
      alert('Please enter a rejection reason before rejecting.')
      return
    }
    updateVendorStatus(selectedVendor._id, 'Rejected')
    setShowDialog(false)
  }

  const updateVendorStatus = (
    id: string,
    newStatus: 'Verified' | 'Rejected'
  ) => {
    setUpdatingItems((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setVendors((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
      )
      setUpdatingItems((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 800)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  // ------- Columns -------
  const columns: { key: keyof VendorRequest; header: string }[] = [
    { key: '_id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status' },
  ]

  // ------- Render -------
  return (
    <div className='p-6'>
      <ResponsiveTable<VendorRequest>
        data={vendors}
        loading={false}
        updatingItems={updatingItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearchKeyPress={handleSearchKeyPress}
        onSearchClick={() => setCurrentPage(1)}
        entityType='vendor-request'
        columns={columns}
        showLabelsOnMobile
        confirmDialog={{
          isOpen: false,
          item: null,
          action: 'block',
        }}
        onConfirmAction={() => {}}
        onCancelAction={() => {}}
        showActionsColumn={true}
        customActions={(item: VendorRequest) => (
          <Button
            variant='outline'
            size='sm'
            onClick={() => handleViewClick(item)}
          >
            View
          </Button>
        )}
      />

      {/* -------- Vendor Verification Dialog -------- */}
      {selectedVendor && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className='max-w-lg'>
            <DialogHeader>
              <DialogTitle>Vendor Verification</DialogTitle>
            </DialogHeader>

            <div className='space-y-3'>
              <p>
                <strong>ID:</strong> {selectedVendor._id}
              </p>
              <p>
                <strong>Name:</strong> {selectedVendor.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedVendor.email}
              </p>

              <p className='font-semibold mt-3'>Uploaded Documents:</p>
              <div className='grid grid-cols-3 gap-3'>
                {selectedVendor.documents.map((doc, index) => (
                  <img
                    key={index}
                    src={doc}
                    alt={`doc-${index}`}
                    className='w-full h-24 object-cover rounded border'
                  />
                ))}
              </div>

              <div className='mt-4'>
                <label className='block mb-1 font-semibold'>
                  Additional Notes / Rejection Reason:
                </label>
                <Textarea
                  placeholder='Write your note or reason here...'
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter className='flex justify-between mt-4'>
              <Button variant='destructive' onClick={handleReject}>
                Reject
              </Button>
              <Button onClick={handleApprove}>Approve</Button>
              <Button variant='outline' onClick={handleCloseDialog}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default VendorVerificationPage
