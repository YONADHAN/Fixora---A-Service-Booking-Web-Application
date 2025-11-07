'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFileValidation } from '@/lib/hooks/useFileValidation'
import { useUpload } from '@/lib/hooks/useUpload'
import { UPLOAD_PURPOSES } from '@/utils/constants/upload.constants'

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { validateFiles } = useFileValidation()
  const { uploadFile } = useUpload()

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const valid = validateFiles(selected)
    setFiles(valid)
  }

  const handleUpload = async () => {
    setIsUploading(true)
    for (const file of files) {
      await uploadFile(file, UPLOAD_PURPOSES.VENDOR_VERIFICATION)
    }
    setFiles([])
    setIsUploading(false)
  }

  return (
    <div className='bg-white p-6 rounded-xl shadow-md max-w-md mx-auto'>
      <h2 className='text-lg font-semibold mb-4'>
        Upload Verification Documents
      </h2>
      <Input type='file' multiple onChange={handleSelect} />
      {files.length > 0 && (
        <ul className='text-sm text-gray-600 mt-3 list-disc list-inside'>
          {files.map((f) => (
            <li key={f.name}>{f.name}</li>
          ))}
        </ul>
      )}
      <Button
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
        className='mt-4 w-full'
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  )
}
