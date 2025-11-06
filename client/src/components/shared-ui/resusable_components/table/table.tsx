'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pagination } from '../pagination/pagination'
import { ConfirmDialog } from '../DialogBox/confirmationPopup'

interface TableItem {
  userId: string
  name: string
  status: string
  [key: string]: unknown
}

export interface ColumnDefinition<T extends TableItem> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
}

interface ResponsiveTableProps<T extends TableItem> {
  data: T[]
  loading: boolean
  updatingItems: Set<string>
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  searchTerm: string
  onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onSearchClick: () => void
  onBlockUnblockClick?: (item: T) => void
  confirmDialog: {
    isOpen: boolean
    item: T | null
    action: 'block' | 'unblock'
  }
  onConfirmAction: () => void
  onCancelAction: () => void
  entityType: string
  columns: ColumnDefinition<T>[]
  showActionsColumn?: boolean
  onRequestVendorClick?: () => void
  showLabelsOnMobile?: boolean
  customActions?: (item: T) => React.ReactNode
}

export function ResponsiveTable<T extends TableItem>({
  data,
  loading,
  updatingItems,
  currentPage,
  totalPages,
  onPageChange,
  searchTerm,
  onSearchTermChange,
  onSearchKeyPress,
  onSearchClick,
  onBlockUnblockClick,
  confirmDialog,
  onConfirmAction,
  onCancelAction,
  entityType,
  columns,
  showActionsColumn = true,
  onRequestVendorClick,
  showLabelsOnMobile = true,
  customActions,
}: ResponsiveTableProps<T>) {
  return (
    <Card className='w-full'>
      <div className='p-6 space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4 flex-wrap gap-4'>
          <h1 className='text-3xl font-serif'>
            {`${
              entityType.charAt(0).toUpperCase() + entityType.slice(1)
            } Management`}
          </h1>

          {entityType === 'vendor' && onRequestVendorClick && (
            <Button
              onClick={onRequestVendorClick}
              variant='outline'
              className='bg-black text-white'
            >
              Requested Vendors
            </Button>
          )}
        </div>

        {/* Search bar */}
        <div className='flex items-center gap-4 mb-4 flex-wrap'>
          <Input
            type='text'
            placeholder={`Search by ${entityType} name or email`}
            className='w-full max-w-sm'
            value={searchTerm}
            onChange={onSearchTermChange}
            onKeyUp={onSearchKeyPress}
          />
          <Button onClick={onSearchClick}>Search</Button>
        </div>

        {/* Table or Loader */}
        {loading ? (
          <div className='text-center py-8'>Loading {entityType}s...</div>
        ) : data.length === 0 ? (
          <div className='text-center py-8'>
            {searchTerm
              ? `No ${entityType}s found matching your search`
              : `No ${entityType}s found`}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className='hidden lg:block overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead
                        key={column.key as string}
                        className={column.className}
                      >
                        {column.header}
                      </TableHead>
                    ))}
                    {showActionsColumn &&
                      (onBlockUnblockClick || customActions) && (
                        <TableHead className='text-center'>Actions</TableHead>
                      )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.userId}>
                      {columns.map((column) => (
                        <TableCell
                          key={`${item.userId}-${column.key.toString()}`}
                        >
                          {column.render
                            ? column.render(item)
                            : (item[column.key as keyof T] as React.ReactNode)}
                        </TableCell>
                      ))}

                      {showActionsColumn &&
                        (onBlockUnblockClick || customActions) && (
                          <TableCell className='text-center'>
                            {customActions ? (
                              customActions(item)
                            ) : (
                              <Button
                                variant='destructive'
                                size='sm'
                                onClick={() => onBlockUnblockClick?.(item)}
                                disabled={updatingItems.has(item.userId)}
                              >
                                {updatingItems.has(item.userId)
                                  ? 'Updating...'
                                  : item.status === 'active'
                                  ? 'Block'
                                  : 'Unblock'}
                              </Button>
                            )}
                          </TableCell>
                        )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className='lg:hidden space-y-4'>
              {data.map((item) => (
                <Card key={item.userId} className='p-4 shadow-sm'>
                  <div className='space-y-2 text-sm'>
                    {columns.map((column) => {
                      const value = column.render
                        ? column.render(item)
                        : item[column.key as keyof T]
                      return (
                        <div
                          key={column.key as string}
                          className='flex justify-between border-b pb-1'
                        >
                          {showLabelsOnMobile && (
                            <span className='font-semibold text-muted-foreground'>
                              {column.header}:
                            </span>
                          )}
                          <span className='text-right'>
                            {value as React.ReactNode}
                          </span>
                        </div>
                      )
                    })}
                    {showActionsColumn &&
                      (onBlockUnblockClick || customActions) && (
                        <div className='flex justify-end pt-2'>
                          {customActions ? (
                            customActions(item)
                          ) : (
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => onBlockUnblockClick?.(item)}
                              disabled={updatingItems.has(item.userId)}
                            >
                              {updatingItems.has(item.userId)
                                ? 'Updating...'
                                : item.status === 'active'
                                ? 'Block'
                                : 'Unblock'}
                            </Button>
                          )}
                        </div>
                      )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className='pt-6'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </>
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.isOpen}
        onCancel={onCancelAction}
        onConfirm={onConfirmAction}
        title={
          confirmDialog.action === 'block'
            ? `Block ${entityType}`
            : `Unblock ${entityType}`
        }
        description={`Are you sure you want to ${confirmDialog.action} ${entityType} "${confirmDialog.item?.name}"?`}
        confirmLabel={
          confirmDialog.action === 'block'
            ? `Block ${entityType}`
            : `Unblock ${entityType}`
        }
        confirmColor={confirmDialog.action === 'block' ? 'red' : 'green'}
      />
    </Card>
  )
}
