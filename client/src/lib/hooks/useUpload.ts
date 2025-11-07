import { toast } from 'sonner'
import { getPresignedUrl, saveUploadedFile } from '@/api/uploads/upload.api'

export const useUpload = () => {
  const uploadFile = async (file: File, purpose: string) => {
    try {
      const { data } = await getPresignedUrl(file.name, file.type, purpose)
      const { url, key, bucket } = data

      //Upload to MinIO/S3
      const putResponse = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      if (!putResponse.ok) throw new Error('Upload failed')
      await saveUploadedFile(bucket, key, file.name, purpose)
      toast.success('File uploaded successfully')
    } catch (error) {
      console.error('Upload failed', error)
      if (error instanceof Error) {
        toast.error(error?.message || 'File upload failed')
      }

      throw error
    }
  }
  return { uploadFile }
}
