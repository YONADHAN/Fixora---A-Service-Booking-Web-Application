import { axiosInstance } from '../interceptor'

export const getPresignedUrl = async (
  filename: string,
  contentType: string,
  purpose: string
) => {
  return axiosInstance.post('/api/v1/uploads/presign', {
    filename,
    contentType,
    purpose,
  })
}

export const saveUploadedFile = async (
  bucket: string,
  key: string,
  originalName: string,
  purpose: string
) => {
  return axiosInstance.post('/api/v1/uploads/save', {
    bucket,
    key,
    originalName,
    purpose,
  })
}
