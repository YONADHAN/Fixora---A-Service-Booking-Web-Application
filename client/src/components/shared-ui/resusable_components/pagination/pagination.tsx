'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  // Generate nearby page numbers for better UX
  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
  )

  return (
    <div className='flex justify-center items-center gap-2 mt-4 flex-wrap'>
      {/* Previous */}
      <Button
        variant='outline'
        size='sm'
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {/* Page numbers */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={page}>
          {index > 0 && visiblePages[index - 1] !== page - 1 && (
            <span>...</span>
          )}
          <Button
            size='sm'
            variant={page === currentPage ? 'default' : 'outline'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        </React.Fragment>
      ))}

      {/* Next */}
      <Button
        variant='outline'
        size='sm'
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  )
}
