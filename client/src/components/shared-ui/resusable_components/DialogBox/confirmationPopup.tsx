'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  confirmLabel?: string
  confirmColor?: 'red' | 'green' | 'default'
}

export function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  confirmColor = 'default',
}: ConfirmDialogProps) {
  const confirmButtonClass =
    confirmColor === 'red'
      ? 'bg-red-600 hover:bg-red-700 text-white'
      : confirmColor === 'green'
      ? 'bg-green-600 hover:bg-green-700 text-white'
      : 'bg-primary text-white'

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className='max-w-sm sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>{title}</DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='flex justify-end gap-3 mt-4'>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button className={confirmButtonClass} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
